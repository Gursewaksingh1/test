const { getRestaurantModel } = require("../../models/tenantModels/restaurant");
const { getImageModel } = require("../../models/tenantModels/images");
const {
  getRestaurantBannersModel,
} = require("../../models/tenantModels/restaurantBanners");
var ObjectId = require("mongoose").Types.ObjectId;
const envData = require("../../utils/config");
const {
  addImage,
  checkId,
  deleteimage,
} = require("../../utils/commonFunctions");

exports.addBanner = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let imagePath = req.files;
  let { name, desc, backgroundColor, restaurantName, restaurantId } = req.body;
  try {
    let Restaurant = await getRestaurantModel(tenantName);
    let Banner = await getRestaurantBannersModel(tenantName);
    let Image = await getImageModel(tenantName);
    if (restaurantId !== undefined) {
      const result = await checkId(restaurantId, Restaurant, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "restaurant Id is invalid" });
      }
    } else {
      return res
        .status(404)
        .send({ status: "failed", error: "restaurant Id is invalid" });
    }
    if (imagePath === undefined || imagePath.banner === undefined) {
      return res
        .status(404)
        .send({ status: "falied", error: "missing banner image" });
    }
    let bannerIds = await addImage(imagePath.banner, Image);
    let banner = new Banner({
      name,
      desc,
      backgroundColor,
      restaurantName,
      restaurantId,
      banner: bannerIds,
    });
    await banner.save();
    await Restaurant.findByIdAndUpdate(
      { _id: restaurantId },
      { $push: { restaurantBannersId: banner._id } }
    );
    return res.status(200).send({ status: "success", data: banner });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

exports.getBannerbyRestaurantId = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let { restaurantId } = req.params;
  try {
    let Banner = await getRestaurantBannersModel(tenantName);
    let Restaurant = await getRestaurantModel(tenantName);
    if (restaurantId !== undefined) {
      const result = await checkId(restaurantId, Restaurant, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "restaurant Id is invalid" });
      }
    }
    let banner = await Banner.find({ restaurantId });
    if (banner.length === 0) {
      return res
        .status(404)
        .send({ status: "failed", message: "invalid restaurantId" });
    }
    return res.status(200).send({ status: "success", data: banner });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

exports.deleteBanner = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  try {
    let { restaurantId, bannerId } = req.query;
    let Restaurant = await getRestaurantModel(tenantName);
    let Banner = await getRestaurantBannersModel(tenantName);
    let Image = await getImageModel(tenantName);
    if (bannerId !== undefined) {
      const result = await checkId(bannerId, Banner, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "banner Id is invalid" });
      } else {
        let banner = await Banner.findById({ _id: bannerId }).populate(
          "banner"
        );
        deleteimage(banner.banner.image);
        console.log(bannerId, banner.restaurantId);
        await Banner.findByIdAndRemove({ _id: bannerId });
        await Image.findByIdAndRemove({ _id: banner.banner._id });
        let data = await Restaurant.findByIdAndUpdate(
            { _id: banner.restaurantId },
            { $pull: { restaurantBannersId: bannerId } }
          );
          console.log(data);
        return res
          .status(200)
          .send({ status: "success", message: "banner deleted" });
      }
    } else if (restaurantId !== undefined) {
      const result = await checkId(restaurantId, Restaurant, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "banner Id is invalid" });
      } else {
        let banner = await Banner.find({ restaurantId: restaurantId }).populate(
          "banner"
        );
        for (let i = 0; i < banner.length; i++) {
          deleteimage(banner[i].banner.image);
          await Image.findByIdAndRemove({ _id: banner[i].banner._id });
          await Restaurant.findByIdAndUpdate(
            { _id: restaurantId },
            { $pull: { restaurantBannersId: banner[i]._id } }
          );
        }
        await Banner.deleteMany({ restaurantId: restaurantId });
        return res
          .status(200)
          .send({ status: "success", message: "banners deleted" });
      }
    } else {
        return res
        .status(404)
        .send({ status: "failed", error: "must provide restaurant id or banner id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

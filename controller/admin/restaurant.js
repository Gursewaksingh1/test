const { getRestaurantModel } = require("../../models/tenantModels/restaurant");
const { getImageModel } = require("../../models/tenantModels/images");
const { getRatingModel } = require("../../models/tenantModels/rating");
var ObjectId = require("mongoose").Types.ObjectId;
const { addImage, checkId } = require("../../utils/commonFunctions");
const envData = require("../../utils/config");
exports.addRestaurent = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let {
    name,
    address,
    displayAddress,
    slug,
    backgroundColor,
    openingTime,
    closingTime,
    status,
  } = req.body;
  let imagePath = req.files;
  try {
    let Restaurant = await getRestaurantModel(tenantName);
    let Image = await getImageModel(tenantName);
    let Rating = await getRatingModel(tenantName);

    if (
      imagePath === undefined ||
      imagePath.logo === undefined ||
      imagePath.cover === undefined
    ) {
      return res
        .status(404)
        .send({ status: "falied", error: "missing cover or logo" });
    }
    let logoIds = await addImage(imagePath.logo, Image);
    let coverIds = await addImage(imagePath.cover, Image);
    let restaurant = new Restaurant({
      name,
      address,
      displayAddress,
      slug,
      backgroundColor,
      openingTime,
      closingTime,
      status,
      logo: logoIds,
      coverPhoto: coverIds,
    });
    await restaurant.save();
    return res.status(200).send({ status: "success", data: restaurant });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
exports.getRestaurant = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  try {
    let Restaurant = await getRestaurantModel(tenantName);
    let Image = await getImageModel(tenantName);
    let Rating = await getRatingModel(tenantName);
    let restaurant = await Restaurant.find().populate(
      "logo coverPhoto ratingId"
    );
    res.status(200).send({ status: "success", data: restaurant });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

exports.getRestaurantById = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let id = req.params.id;
  try {
    let Restaurant = await getRestaurantModel(tenantName);
    let Image = await getImageModel(tenantName);
    let Rating = await getRatingModel(tenantName);
    let restaurant = await Restaurant.find({ _id: id }).populate(
      "logo coverPhoto ratingId"
    );
    res.status(200).send({ status: "success", data: restaurant });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

exports.updateRestaurent = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let {
    id,
    name,
    address,
    displayAddress,
    slug,
    backgroundColor,
    openingTime,
    closingTime,
    status,
  } = req.body;
  let imagePath = req.files;
  try {
    let Restaurant = await getRestaurantModel(tenantName);
    let Image = await getImageModel(tenantName);
    let Rating = await getRatingModel(tenantName);
    if (id !== undefined) {
      const result = await checkId(id, Restaurant, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "Id is invalid" });
      }
    }
    let restaurant = await Restaurant.findById({ _id: id });
    restaurant.name = name;
    restaurant.address = address;
    restaurant.displayAddress = displayAddress;
    restaurant.slug = slug;
    restaurant.backgroundColor = backgroundColor;
    restaurant.openingTime = openingTime;
    restaurant.closingTime = closingTime;
    restaurant.status = status;

    if (imagePath.logo) {
      let logoIds = await addImage(imagePath.logo, Image);
      await Restaurant.findByIdAndUpdate(
        { _id: id },

        { $push: { logo: logoIds } }
      );
    }
    if (imagePath.cover) {
      let coverIds = await addImage(imagePath.cover, Image);

      await Restaurant.findByIdAndUpdate(
        { _id: id },

        { $push: { coverPhoto: coverIds } }
      );
    }
    await restaurant.save();
    return res.status(200).send({ status: "success", data: restaurant });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

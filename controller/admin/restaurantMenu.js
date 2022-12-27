const { getRestaurantModel } = require("../../models/tenantModels/restaurant");
const { getImageModel } = require("../../models/tenantModels/images");
const { getMenuModel } = require("../../models/tenantModels/menu");
const { getCategoryModel } = require("../../models/tenantModels/category");
const { getProductModel } = require("../../models/tenantModels/product");
const {
  getSubCategoryModel,
} = require("../../models/tenantModels/subCategory");
var ObjectId = require("mongoose").Types.ObjectId;
const envData = require("../../utils/config");
const {
  addImage,
  checkId,
  deleteimage,
  deleteArrOfDocs,
} = require("../../utils/commonFunctions");

exports.addMenu = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let imagePath = req.files;
  let { name, restaurantId } = req.body;
  try {
    let Restaurant = await getRestaurantModel(tenantName);
    let Image = await getImageModel(tenantName);
    let Menu = await getMenuModel(tenantName);
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
    if (imagePath === undefined || imagePath.image === undefined) {
      return res
        .status(404)
        .send({ status: "falied", error: "missing menu image" });
    }
    let imageIds = await addImage(imagePath.image, Image);
    let menu = new Menu({
      name,
      image: imageIds,
      restaurantId,
    });
    await menu.save();
    await Restaurant.findByIdAndUpdate(
      { _id: restaurantId },
      { $push: { menu: menu._id } }
    );
    return res.status(200).send({ status: "success", data: menu });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
// delete api is made but testing is pending for sub category
exports.deleteMenuByRestaurantIdOrMenuId = async (req, res) => {
  let { restaurantId, id } = req.query;
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  try {
    let Restaurant = await getRestaurantModel(tenantName);
    let Image = await getImageModel(tenantName);
    let Menu = await getMenuModel(tenantName);
    let Category = await getCategoryModel(tenantName);
    let SubCategory = await getSubCategoryModel(tenantName);
    let Product = await getProductModel(tenantName);
    if (restaurantId) {
      const result = await checkId(restaurantId, Restaurant, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "restaurant Id is invalid" });
      } else {
        let menu = await Menu.find({ restaurantId: restaurantId }).populate({
          path: "image categoryIds",
          populate: {
            path: "image",
          },
        });
        console.log({ menu });
        for (let i = 0; i < menu.length; i++) {
          //delete menu image
          deleteimage(menu[i].image.image);
          await Image.findByIdAndRemove({ _id: menu[i].image._id });
          for (let j = 0; j < menu[i].categoryIds.length; j++) {
            await Category.findByIdAndRemove({
              _id: menu[i].categoryIds[j]._id,
            });
            //delete categoryIds image
            deleteimage(menu[i].categoryIds[j].image);
            await Image.findByIdAndRemove({ _id: menu[i].categoryIds[j]._id });
          }
        }
        await Menu.deleteMany({ restaurantId: restaurantId });
        return res
          .status(200)
          .send({ status: "success", message: "menus deleted" });
      }
    } else if (id) {
      const result = await checkId(id, Menu, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "menu Id is invalid" });
      } else {
        let menu = await Menu.findById({ _id: id }).populate([
          {
            path: "categoryIds",

          },
          {
            path: "categoryIds",
            populate: {
              path: "image",
            },
          },
          {
            path: "image",
            populate: {
              path: "image",
            },
          },
          {
            path: "categoryIds.subCategoryIds",
            populate: {
              path: "image productIds",
            },
          },
        ]);
        let directProducts = await Product.find({menuId:id});
        // console.log({ menu });
        // console.log({ category: menu.categoryIds[0].image });
        // console.log({ directProducts });
        // delete menu image
        deleteimage(menu.image.image);
        await Image.findByIdAndRemove({ _id: menu.image._id });
      // delete category
        deleteArrOfDocs(menu.categoryIds,Category, Image);
        if(menu.categoryIds && menu.categoryIds.subCategoryIds) {
// delete subCategory
          deleteArrOfDocs(menu.categoryIds.subCategoryIds,SubCategory, Image);
        }
        if(menu.categoryIds && menu.categoryIds.subCategoryIds && menu.categoryIds.subCategoryIds) {
          // delete product
          deleteArrOfDocs(menu.categoryIds.subCategoryIds.productIds,Product, Image);
        }

        if(directProducts) {
          // delete direct product
          deleteArrOfDocs(directProducts,Product, Image);
        }
        await Menu.findByIdAndRemove({ _id: id });
        return res
          .status(200)
          .send({ status: "success", message: "menu deleted" });
      }
    } else {
      return res
        .status(404)
        .send({
          status: "failed",
          error: "must provide restaurant id or menu id",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

exports.updateMenu = async (req, res) => {
  let { name, restaurantId, id } = req.body;
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let imagePath = req.files;
  try {
    let Restaurant = await getRestaurantModel(tenantName);
    let Image = await getImageModel(tenantName);
    let Menu = await getMenuModel(tenantName);
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
    let menu = await Menu.findById({ _id: id }).populate("image");
    if (menu) {
      menu.name = name;
      menu.restaurantId = restaurantId;
      if (imagePath.image) {
        // delete old record and unlink image then add new
        await Image.findByIdAndRemove({ _id: menu.image._id });
        deleteimage(menu.image.image);
        let imageId = await addImage(imagePath.image, Image);
        menu.image = imageId;
      }
      await menu.save();
    }
    return res.status(200).send({ status: "success", error: "menu updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
exports.getMenuByRestaurantIdOrMenuId = async (req, res) => {
  let { name, restaurantId, id } = req.query;
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  try {
    let Restaurant = await getRestaurantModel(tenantName);
    let Image = await getImageModel(tenantName);
    let category = await getCategoryModel(tenantName);
    let Menu = await getMenuModel(tenantName);

    if (restaurantId) {
      const result = await checkId(restaurantId, Restaurant, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "restaurant Id is invalid" });
      } else {
        let menu = await Menu.find({ restaurantId: restaurantId }).populate(
          "image categoryIds"
        );

        return res.status(200).send({ status: "success", data: menu });
      }
    } else if (id) {
      const result = await checkId(id, Menu, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "menu Id is invalid" });
      } else {
        let menu = await Menu.findById({ _id: id }).populate(
          "image categoryIds"
        );
        return res.status(200).send({ status: "success", data: menu });
      }
    } else {
      return res
        .status(404)
        .send({
          status: "failed",
          error: "must provide restaurant id or menu id",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

//category section

exports.addCategory = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let imagePath = req.files;
  let { name, menuId, description } = req.body;
  try {
    let Image = await getImageModel(tenantName);
    let Menu = await getMenuModel(tenantName);
    let Category = await getCategoryModel(tenantName);
    if (menuId !== undefined) {
      const result = await checkId(menuId, Menu, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "menu Id is invalid" });
      }
    } else {
      return res
        .status(404)
        .send({ status: "failed", error: "menu Id is invalid" });
    }
    if (imagePath === undefined || imagePath.image === undefined) {
      return res
        .status(404)
        .send({ status: "falied", error: "missing category image" });
    }
    let imageIds = await addImage(imagePath.image, Image);
    let category = new Category({
      name,
      description,
      image: imageIds,
      menuId,
    });
    await category.save();
    await Menu.findByIdAndUpdate(
      { _id: menuId },
      { $push: { categoryIds: category._id } }
    );
    return res.status(200).send({ status: "success", data: category });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

exports.getCategoryByMenuIdOrCategoryId = async (req, res) => {
  let {menuId, id } = req.query;
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  try {
    let SubCategory = await getSubCategoryModel(tenantName);
    let Image = await getImageModel(tenantName);
    let Category = await getCategoryModel(tenantName);
    let Menu = await getMenuModel(tenantName);

    if (menuId) {
      const result = await checkId(menuId, Menu, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "Menu Id is invalid" });
      } else {
        let category = await Category.find({ menuId: menuId }).populate(
          "image subCategoryIds"
        );

        return res.status(200).send({ status: "success", data: category });
      }
    } else if (id) {
      const result = await checkId(id, Category, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "category Id is invalid" });
      } else {
        let category = await Category.findById({ _id: id }).populate(
          "image subCategoryIds"
        );
        return res.status(200).send({ status: "success", data: category });
      }
    } else {
      return res
        .status(404)
        .send({
          status: "failed",
          error: "must provide category id or menu id",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
  
}

exports.updateCategory = async (req, res) => {
  let { name, menuId, description, id } = req.body;
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let imagePath = req.files;
  try {
    let Image = await getImageModel(tenantName);
    let Menu = await getMenuModel(tenantName);
    let Category = await getCategoryModel(tenantName);
    if (menuId !== undefined) {
      const result = await checkId(menuId, Menu, ObjectId);
      if (!result) {
        return res
          .status(404)
          .send({ status: "failed", error: "Menu Id is invalid" });
      }
    } else {
      return res
        .status(404)
        .send({ status: "failed", error: "Menu Id is invalid" });
    }
    let category = await Category.findById({ _id: id }).populate("image");
    if (category) {
      category.name = name;
      category.menuId = menuId;
      category.description = description;
      if (imagePath.image) {
        // delete old record and unlink image then add new
        await Image.findByIdAndRemove({ _id: category.image._id });
        deleteimage(category.image.image);
        let imageId = await addImage(imagePath.image, Image);
        category.image = imageId;
      }
      await category.save();
    }
    return res.status(200).send({ status: "success", error: "category updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
}
const fs = require("fs");
function imagePaths(files) {
    arrayOfImage = [];
    files.forEach((image) => {
      arrayOfImage.push(image.path);
    });
    return arrayOfImage;
  }
  
  function deleteimage(path) {
    fs.unlink(path, function (err) {
      if (err) {
        //console.log(err);
      }
      console.log("image deleted");
    });
  }
  async function deleteArrOfDocs(arrOfDoc, Model,Image ) {
    if(arrOfDoc) {
      let ids = getIds(arrOfDoc)
      console.log({ids});
      
      for (let j = 0; j <arrOfDoc.length; j++) {
        deleteimage(arrOfDoc[j].image.image);
        console.log("arrOfDoc[j].image");
        console.log(arrOfDoc[j].image);
        await Image.findByIdAndRemove({ _id: arrOfDoc[j].image._id });
      }
      await Model.deleteMany({ _id:{$in: ids}});
      return true;
    } else {
      return false;
    }
   
  
  }
  
  async function addImage(image, Image,) {
    let imageArr = [], ids;
    if (image !== undefined) {
      for (let i = 0; i < image.length; i++) {
        // let extArray = imagePath.image[i].mimetype.split("/");
        // let extension = extArray[extArray.length - 1];
        // let fileName = uuid()+"."+extension;
        let paths = imagePaths(image);
  
      paths.forEach((path) => {
        let image = {
          image: path,
        };
        imageArr.push(image);
      });
      let data = await Image.insertMany(imageArr);
      ids = data.map((e) => e.id);
      }
      return ids;
    } else {
      return false;
    }
  }
  async function checkId(id, Model, ObjectId) {
    if (ObjectId.isValid(id)) {
      const data = await Model.findById(id);
      if (data) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function getIds(data) {
    let ids = data.map(id => id._id);
    return ids
  }
module.exports = {
    imagePaths,
    deleteimage,
    addImage,
    checkId,
    getIds,
    deleteArrOfDocs
}  
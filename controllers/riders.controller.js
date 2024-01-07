const Rider = require("../models/Rider.model");
const Comment = require("../models/Comment.model");
const e = require("express");

module.exports.list = function (req, res, next) {
  const query = {};

  query.legend = !!req.query.legend;

  if (req.query.search) {
    const regex = new RegExp(req.query.search, "i");

    query.name = { $regex: regex };
  }

  Rider.find(query)
    .populate('likes')
    .then((riders) => {
      console.log(riders)
      res.render("riders/list", { riders })
    })
    .catch((error) => next(error));
};

module.exports.details = function (req, res, next) {
  const { id } = req.params;

  Rider.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((rider) => {
      if (rider) {
        console.log(rider);
        res.render("riders/details", { rider });
      } else {
        res.redirect("/riders");
      }
    })
    .catch(next);
};

//aqui get
module.exports.create = (req, res, next) => {
  res.render("riders/form"); // meter un condicional de errores
};

//aqui pos

module.exports.doCreate = function (req, res, next) {
  console.log("esto lleva la req", req);
  // Si existe un archivo en la solicitud, es la imagen principal
  console.log("Esta es la imagen", )
  if (req.files.image) {
    console.log("Este es el path de la imagen", req.files.image[0].path)
    req.body.image = req.files.image[0].path;
    console.log("imagen principal", req.file)
  }


  // Si existen archivos en la solicitud con el campo 'gallery', son las imágenes de la galería
  if (req.files.gallery) {
    console.log("Files -> ", req.files)
    req.body.gallery = req.files.gallery.map(file => file.path);
    console.log("galeriaaa", req.files.gallery)
  }

  Rider.create(req.body)
    .then((riderDB) => {
      console.log("rider despuest de la db ", riderDB)
      res.redirect(`/riders/${riderDB.id}`);
    })
    .catch((err) => {
      // Comprobar err instanceof mongoose.ValidationError

      next(err);
    });
};


module.exports.update = (req, res, next) => {
  const { id } = req.params;
  Rider.findById(id)
    .then((rider) => res.render("riders/form", { rider })) // meter un condicional de errores
    .catch((error) => next(error));
};

module.exports.doUpdate = function (req, res, next) {
  const { id } = req.params;
  const updates = { ...req.body };

  if (req.file) {
    updates.image = req.file.path;
  }

  Rider.findByIdAndUpdate(id, updates, { new: true })
    .then((riderDB) => res.redirect(`/riders/${id}`))
    .catch((err) => {
      //Comprobar err instanceof mongoose.ValidationError

      next(err);
    });
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Rider.findByIdAndDelete(id)
    .then((rider) => res.redirect("/riders"))
    .catch((error) => next(error));
};

module.exports.gallery = (req, res, next) => {
  const { id } = req.params;
  console.log("que es lo que recibo ", id)
  Rider.findById(id)
    .then((rider) => {
      console.log("este es mi rider", rider)
      const arrGallery = rider.gallery;
      res.render('riders/gallery', {arrGallery});
    })
    .catch((err) => {
      next(err)
    })
};
// Importa el modelo Comment
const Comment = require("../models/Comment.model");
// Controlador para crear un nuevo comentario

module.exports.doCreate = (req, res, next) => {
  // Extrae el contenido del comentario y el ID del rider desde la solicitud
  const commentToCreate = req.body;
  commentToCreate.user = req.session.currentUser._id;
  commentToCreate.rider = req.params.id;

  Comment.create(req.body)
    .then((comment) => {
      res.redirect(`/riders/${comment.rider._id}`);
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  // Extrae el ID del comentario de los parámetros de la solicitud
  const { id } = req.params;
  // Busca y elimina el comentario por su ID
  Comment.findByIdAndDelete(id)
    .then((comment) => {
      res.redirect(`/rider/${comment.rider._id}`);
    })
    .catch(next);
};

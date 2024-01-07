const mongoose = require("mongoose");
// Definir el esquema del comentario
const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  // Campo 'user' que contendrá el ID del usuario que escribió el comentario
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Hace referencia al modelo 'User'
    required: true,
  },
  // Campo 'rider' que contendrá el ID del rider asociado al comentario
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rider", // Hace referencia al modelo 'Rider'
    required: true,
  },
});
// Crear el modelo 'Comment' a partir del esquema
const Comment = mongoose.model("Comment", CommentSchema);
// Exportar el modelo
module.exports = Comment;

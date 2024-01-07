const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    rider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rider",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
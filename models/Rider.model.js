const mongoose = require("mongoose");

const RiderSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    flag: {
      type: String,
    },
    nationality: {
      type: String,
      required: true,
    },
    bike: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    placeOfBirth: {
      type: String,
    },
    height: {
      type: String,
    },
    story: {
      type: String,
    },
    worldChampionship: {
      type: String,
    },
    victories: {
      type: String,
    },
    podiums: {
      type: String,
    },
    poles: {
      type: String,
    },
    races: {
      type: String,
    },
    legend: {
      type: Boolean,
      default: false,
    },
    gallery: {
      type: [String],
     
    },
  },
  {
    virtual: true,
  }
);

RiderSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "rider",
  justOne: false,
});

RiderSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "rider",
  justOne: false,
});

const Rider = mongoose.model("Rider", RiderSchema);
module.exports = Rider;

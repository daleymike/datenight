const mongoose = require("mongoose");

const DateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      minlength: [5, "Zip Code must be 5 characters"],
      maxlength: [5, "Zip Code must be 5 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [5, "Description must be at least 5 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
    },
    user_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Date", DateSchema);

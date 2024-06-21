const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: [
    {
      sub_name: {
        type: String,
      },
    },
  ],
});

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;

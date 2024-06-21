const express = require("express");
const {
  addCategory,
  getCategoryByPagination,
  updateCategory,
  deleteCategory,
  addSubCategory,
} = require("../controllers/categoryController");
const { auth } = require("../middleware/auth");
const categoryRoutes = express.Router();

categoryRoutes.post("/add", auth(["user"]), addCategory);
categoryRoutes.post("/add_subcategory/:id", auth(["user"]), addSubCategory);
categoryRoutes.get("/get", auth(["user"]), getCategoryByPagination);
categoryRoutes.patch("/update/:id", auth(["user"]), updateCategory);
categoryRoutes.delete("/delete/:id", auth(["user"]), deleteCategory);

module.exports = categoryRoutes;

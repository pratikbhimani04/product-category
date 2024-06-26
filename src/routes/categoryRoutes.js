const express = require("express");
const {
  addCategory,
  getCategoryByPagination,
  updateCategory,
  deleteCategory,
  addSubCategory,
} = require("../controllers/categoryController");
const { auth } = require("../middleware/auth");
const validateSchema = require("../middleware/schemaValidate");
const {
  AddCategoryReqSchema,
  AddSubCategoryReqSchema,
  DeleteCategoryReqSchema,
} = require("../validators/categorySchema");
const categoryRoutes = express.Router();

categoryRoutes.post(
  "/add",
  validateSchema(AddCategoryReqSchema),
  auth(["user"]),
  addCategory
);
categoryRoutes.post(
  "/add_subcategory/:id",
  validateSchema(AddSubCategoryReqSchema),
  auth(["user"]),
  addSubCategory
);
categoryRoutes.get("/get", auth(["user"]), getCategoryByPagination);
categoryRoutes.patch(
  "/update/:id",
  validateSchema(AddCategoryReqSchema),
  auth(["user"]),
  updateCategory
);
categoryRoutes.delete(
  "/delete/:id",
  validateSchema(DeleteCategoryReqSchema),
  auth(["user"]),
  deleteCategory
);

module.exports = categoryRoutes;

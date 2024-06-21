const CategoryModel = require("../model/categoryModel");

async function addCategory(req, res) {
  if (!req.body.category) {
    return res.status(400).send({ error: "category is required" });
  }
  const category = new CategoryModel(req.body);
  try {
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function addSubCategory(req, res) {
  const { sub_name } = req.body;
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    const subcategoryExists = category.subcategories.some(
      (subcategory) => subcategory.sub_name === sub_name
    );
    if (subcategoryExists) {
      return res.status(400).send({ error: "Subcategory already exists" });
    }

    category.subcategories.push({ sub_name });
    await category.save();
    res.status(201).json({ message: "Subcategory added", category: category });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getCategoryByPagination(req, res) {
  const { page = 1, limit = 10, search = "" } = req.query;
  try {
    const categories = await CategoryModel.find({
      category: { $regex: search, $options: "i" },
    })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();
    res
      .status(200)
      .json({ message: "category got successfully", categories: categories });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateCategory(req, res) {
  const { category: newCategoryName, subcategories } = req.body;
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const isCategory = await CategoryModel.findOne({
      category: newCategoryName,
    });

    if (isCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    if (newCategoryName) {
      category.category = newCategoryName;
    }

    if (subcategories) {
      subcategories.forEach((subcategory) => {
        const index = category.subcategories.findIndex(
          (sub) => sub.sub_name === subcategory.sub_name
        );

        if (index !== -1) {
          category.subcategories[index] = subcategory;
        } else {
          category.subcategories.push(subcategory);
        }
      });
    }

    await category.save();
    res.json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const isExist = await CategoryModel.findById(req.params.id);

    if (!isExist) {
      return res.status(404).json({ message: "Category not found" });
    }

    await CategoryModel.findByIdAndDelete(req.params.id);

    res.json({ message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addCategory,
  addSubCategory,
  getCategoryByPagination,
  updateCategory,
  deleteCategory,
};

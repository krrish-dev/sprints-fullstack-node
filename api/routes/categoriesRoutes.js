// routes/categories.js

const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Create a new category
router.post('/', categoriesController.createCategory);

// Get all categories
router.get('/', categoriesController.getAllCategories);

// Get a specific category by ID
router.get('/:categoryId', categoriesController.getCategoryById);

// Update a category by ID
router.put('/:categoryId', categoriesController.updateCategoryById);

// Delete a category by ID
router.delete('/:categoryId', categoriesController.deleteCategoryById);

module.exports = router;

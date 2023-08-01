// routes/categories.js

const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authorization = require('../utils/authorization');
const constants = require('../utils/constants');

// Create a new category
router.post('/', authorization.verifyAccess(constants.Actions.addCategory), categoriesController.createCategory);

// Get all categories
router.get('/', categoriesController.getAllCategories);

// Get a specific category by ID
router.get('/:categoryId', categoriesController.getCategoryById);

// Update a category by ID
router.put('/:categoryId', authorization.verifyAccess(constants.Actions.updateCategory), categoriesController.updateCategoryById);

// Delete a category by ID
router.delete('/:categoryId', authorization.verifyAccess(constants.Actions.deleteCategory), categoriesController.deleteCategoryById);

module.exports = router;

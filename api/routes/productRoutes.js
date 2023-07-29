const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/product', productController.getProducts);
router.put('/product', productController.updateProduct);
router.delete('/product/:productId([a-zA-Z0-9]*)', productController.deleteProduct);
router.post('/product', productController.createProduct);

module.exports = router;
const router = require('express').Router();
const cartController = require('../controllers/cartController');

router.get('/createCart', cartController.createCart);
router.post('/cartItem', cartController.addProductToCart);
router.get('/cart', cartController.getCart)

module.exports = router;
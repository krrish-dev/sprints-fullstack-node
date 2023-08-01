const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authorization = require('../utils/authorization');
const constants = require('../utils/constants');

router.post('/order', authorization.verifyAccess(constants.Actions.placeOrder), orderController.checkOut);
router.get('/order', (req, res)=>{
    res.send("Here is the order");
});
router.post('/newOrder', (req, res)=>{
    res.send("Here is the new order");
});
router.post('/paymentSuccess', authorization.verifyAccess(constants.Actions.placeOrder), orderController.onPaymentSuccess);
router.get('/paymentCanceled', authorization.verifyAccess(constants.Actions.placeOrder), orderController.onPaymentCancelled);
router.post('/webhook', express.raw({type: 'application/json'}),orderController.onPaymentStatusChange);
module.exports = router;
//'cs_test_b1kA1JU3PMFzcfsmvkZeB20Xht60FB0jk1XnXKL9AJ8ggRDUWJMkmuvmI5'
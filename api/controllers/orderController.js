const orderModel = require('../models/orderModel');

async function checkOut(req, res){
    let response = await orderModel.checkOut(req.user.cartId, req.body);
    console.log(response);
    if(!response.success){
        res.send(response);
        return;
    }
    res.status(response.status??200).send(response);
}

async function onPaymentStatusChange(req, res){
    let sig = req.headers['stripe-signature'];
    let body = req.body;
    let response = orderModel.onPaymentStatusChange(sig, body);
    if(!response.success){
        res.status(response.status??200).send(response.message);
        return;
    }
    res.send();
}

async function onPaymentSuccess(req, res){
    let response = await orderModel.onPaymentSuccess(req.body.paymentId, req.user.cartId);
    res.status(response.status??200).send(response);
}

async function onPaymentCancelled(req, res){
    let response = await orderModel.onPaymentCancelled(req.user.cartId);
    res.status(response.status??200).send(response);
}

module.exports = {
    checkOut,
    onPaymentStatusChange,
    onPaymentSuccess,
    onPaymentCancelled
}
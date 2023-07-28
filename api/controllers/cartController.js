const { ReadableStreamDefaultController } = require('stream/web');
const cartModel = require('../models/cartModel');

async function createCart(req, res){
   let cartId = await cartModel.createCart("64c28f639f765f89c2152c36");
   res.send(cartId);
}

async function addProductToCart(req, res){
    let result = await cartModel.addProductToCart("64c417189d9505c5ccc12f95", req.body);
    res.send(result);
}

async function getCart(req, res){
    let result = await cartModel.getCart("64c417189d9505c5ccc12f95");
    res.send(result);
}

module.exports = {
    createCart,
    addProductToCart,
    getCart
};
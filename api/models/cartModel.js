const Cart = require('../schemas/cart');

async function createCart(userId){
    let cartObj = new Cart({userId:userId, products:[]});
    let result = await cartObj.save().catch(err=>{
        console.log("failed to create cart", err);
        throw err;
    });
    return result._id;
}

async function getCart(cartId){
    console.log("getting cart", cartId);
    let response = {success: true};
    let cartObj = await Cart.findById(cartId).populate(
        'products.product',
        ['title', 'price', 'img'],
      ).exec().catch(err=>{
        console.log("failed to get cart", err);
        response.success = false;
    });
    if(!response.success){
        response.message = "Error Occured while getting cart";
        return response;
    }
    response.result = cartObj;
    return response;
}

async function addProductToCart(cartId, product){
    let cart  = await Cart.findById(cartId);

}

async function removeProductFromCart(productId){

}

function getCartItemData(cart, productId){
    for(let cartItem of cart.products)
        if(productId == cartItem.productId) return cartItem;
}

module.exports ={
    createCart,
    getCart,
    addProductToCart,
    removeProductFromCart,
}
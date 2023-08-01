const Order = require('../schemas/order');
const Cart = require('../schemas/cart');
const Product = require('../schemas/product');
const { response } = require('express');
const stripe = require('stripe')('sk_test_51NZf7MIVT2r7id06eE3eJ5gjkAhl8v9IJEYDFHBjU3YjFj2OXCti7MhWBdG9xwqzDdmsjZekdOMdmxqBXd4CXcJV00kkyMohy5');
const TEMP_DOMAIN = "http://localhost:3000";
const PAYMENT_METHOD = {
  cod: 'COD',
  card: "CARD"
};

async function checkOut(cartId, orderInfo) {
  let cart = await getCart(cartId);
  if(!cart.result.products||cart.result.products.length <= 0) {
    return {success: false, message:"Empty Cart"};
  }
  if (orderInfo.paymentMethod == PAYMENT_METHOD.cod) {
    cart.result.cutomerInfo = orderInfo;
    let order = formOrderFromCart(cart.result, PAYMENT_METHOD.cod);
    let savingOrderResult = await saveOrder(order);
    if (!savingOrderResult.success) return savingOrderResult;
    return await resetCartAndProducts(cart.result); 
  }
  return await beginPaymentSession(cart, orderInfo);
}

async function beginPaymentSession(cart, orderInfo) {
  let response = { success: true };
  if (!cart.success) return cart;
  if (!cart.result.products || cart.result.products.length == 0) return { success: false, message: "Empty Cart" };
  let itemsList = getProductsList(cart.result);

  const session = await stripe.checkout.sessions.create({
    line_items: itemsList,
    mode: 'payment',
    success_url: `${TEMP_DOMAIN}`,
    cancel_url: `${TEMP_DOMAIN}`,
  }).catch(err => {
    response.success = false;
    response.message = "Error occurred while creating payment session";
  });
  if (!response.success) return response;

  response.result = {
    url: session.url,
    paymentId: session.id
  }
  orderInfo.userId = cart.customer;
  cart.result.cutomerInfo = orderInfo;
  cart.result.paymentId = session.id;
  await cart.result.save();
  return response;
}

async function onPaymentSuccess(paymentId, cartId) {
  let response = { success: true };
  let cart = await getCart(cartId);
  cart = cart.result;
  if (!cart.paymentId||cart.paymentId != paymentId) {
    response.success = false;
    response.message = "There is no payment initiated.";
    return response;
  }

  response.result = formOrderFromCart(cart);
  let savingOrderResult = await saveOrder(response.result);
  if (!savingOrderResult.success) return savingOrderResult;
  response  = await resetCartAndProducts(cart);
  return response;
}

async function onPaymentCancelled(cartId){
  let response = {success: true, status: 200};
  await Cart.findByIdAndUpdate(cartId, {paymentId: null, cutomerInfo: null}).catch(err =>{
    response.success = false;
    response.message = "Error while cancelling payment";
    response.status = 500;
  });
  if(!response.success) return response;
  response.result = "Order Cancelled successfully";
  return response;
}

function getProductsList(cart) {
  let productsList = [];
  for (let cartItem of cart.products) {
    productsList.push({
      price_data: {
        currency: 'egp',
        unit_amount: cartItem.product.price * 100,
        product_data: {
          name: cartItem.product.title,
          images: cartItem.product.img
        },
      },
      quantity: cartItem.itemsCount
    });
  }
  return productsList;
}

async function getCart(cartId) {
  let response = { success: true };
  let cartObj = await Cart.findById(cartId)
    .select({ "__v": 0, "products._id": 0, "products.price": 0 })
    .populate('products.product', ['title', 'price', 'img'])
    .exec()
    .catch(err => {
      console.log("failed to get cart", err);
      response.success = false;
    });

  if (!response.success) {
    response.message = "Error Occured while getting cart";
    return response;
  }

  // let cart = formCartForResponse(cartObj); 
  response.result = cartObj;
  return response;
}

async function saveOrder(orderObj) {
  let newOrder = new Order(orderObj);
  let response = { success: true };
  await newOrder.save().catch(err => {
    response.success = false;
    response.message = "Error Occured while saving your order";
  });
  return response;
}

function formOrderFromCart(cart, paymentMethod) {
  let order = {};
  let total = 0;
  let itemsCount = 0;
  order.customerInfo = { ...cart.cutomerInfo };
  order.customerInfo.userId = cart.customer._id;
  order.products = [];
  let product = {};
  for (let cartItem of cart.products) {
    product.productId = cartItem.product._id;
    product.title = cartItem.product.title;
    product.price = cartItem.product.price;
    product.itemsCount = cartItem.itemsCount;
    product.total = cartItem.product.price * cartItem.itemsCount;
    order.products.push(product);
    total += product.total;
    itemsCount += product.itemsCount;
    product = {};
  }
  order.billSummary = {
    paymentMethod: paymentMethod ?? PAYMENT_METHOD.card,
    totalPrice: total
  };
  return order;
}


function onPaymentStatusChange(sig, body) {
  const endpointSecret = "whsec_bc83324eaed4abe6233794ab39e67a8884b745cad06de22c7b239239742d794c";
  let event;
  let response = { success: true, status: 200 };

  event = stripe.webhooks.constructEvent(body, sig, endpointSecret).catch(err => {
    response.success = false;
    response.status = 400;
    response.message = `Webhook Error: ${err.message}`;
    return response;
  });

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return response;
}

async function resetCartAndProducts(cart, canceled = false) {
  let response = {success: true, status: 200};
  cart.paymentId = null;
  cart.customerInfo = null;

  if (canceled) {
    await cart.save().catch(err =>{
      response.success = false;
      response.status = 500;
      response.message = "Error while updating the cart."
    });
    return response;
  }

  let productsUpdateQuery = cart.products.map((cartItem) => {
    return {
      updateOne: {
        filter: { _id: cartItem.product._id },
        update: { $inc: { amount: -cartItem.itemsCount } }
      }
    };
  });
  Product.bulkWrite(productsUpdateQuery).catch((error) => {
    console.error(error);
  });
  cart.products = [];
  await cart.save().catch(err =>{
      response.success = false;
      response.status = 500;
      response.message = "Error while updating the cart."
    });
    if(!response.success) {
      return response;
    }
    response.result ={
        customer: "64c66d02f463e3e81e006056",
        products: [],
        paymentId: null,
        total: 0,
        itemsCount: 0
      }
      return response;
}

module.exports = {
  checkOut,
  onPaymentStatusChange,
  onPaymentSuccess,
  onPaymentCancelled,
};

/*
{
  "success": true,
  "result": {
    "cutomerInfo": {
      "mobile": "01227360505",
      "addressLine": "& Maryotya",
      "district": "Haram",
      "state": "Giza"
    },
    "_id": "64c66d02f463e3e81e006058",
    "customer": "64c66d02f463e3e81e006056",
    "products": [
      {
        "product": {
          "_id": "64c3f64f55a84f4e8bce459a",
          "title": "Black Blouse",
          "price": 330,
          "img": [
            "https://iili.io/HLUXf24.jpg"
          ]
        },
        "itemsCount": 1
      },
      {
        "product": {
          "_id": "64c3fd7041fcad2a7e158391",
          "title": "WOMEN'S PAJAMA SET",
          "price": 449,
          "img": [
            "https://iili.io/HZzJeiN.jpg",
            "https://iili.io/HZzJOVp.jpg"
          ]
        },
        "itemsCount": 2
      }
    ],
    "isPaymentInitiated": false,
    "paymentId": "cs_test_b1Fry9PBV4x31EJWpO3z3sgtcYvACXhlsCVB8TMkfBjQPB4TGUPRnjoLjz"
  }
}
*/
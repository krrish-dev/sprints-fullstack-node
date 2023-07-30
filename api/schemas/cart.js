const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = {
    customer: { type: Schema.Types.ObjectId, ref: 'User'},
    products: [{
        product: { type: Schema.Types.ObjectId, ref:'Product'},
        itemsCount: { type: Number, default: 1 },
        price:{type:Number}
    }],
}
const cartSchema = new Schema(cart);
const Cart = mongoose.model('Cart', cartSchema,);
module.exports = Cart;
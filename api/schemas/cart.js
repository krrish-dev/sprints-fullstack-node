const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = {
    customer: { type: Schema.Types.ObjectId, ref: 'User'},
    products: [{
        product: { type: Schema.Types.ObjectId, ref:'Product'},
        price: { type: Number, required: true },
        itemsCount: { type: Number, default: 1 },
    }],
}
const cartSchema = new Schema(cart);
const Cart = mongoose.model('Cart', cartSchema,);
module.exports = Cart;
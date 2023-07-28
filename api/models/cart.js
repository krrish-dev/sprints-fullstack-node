import mongoose from "mongoose";
const Schema = mongoose.Schema;
const cart = {
    userId: { type: String, required: true },
    products:[
        {
            productId:{type:String, required:true},
            title:{type:String, required:true},
            authorName:{type: String, default:""},
            price:{type:Number, required:true},
            itemsCount:{type: Number, default:1},
            img:{type:String, default:"*"}
        }
    ],
}

const cartSchema = new Schema(cart);
const Cart = mongoose.model('Cart', cartSchema,);

export default Cart;
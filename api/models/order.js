import mongoose from "mongoose";
const Schema = mongoose.Schema;
const order = {
    cutomerInfo:{
        userId: { type: Schema.Types.ObjectId, ref:'User'},
        mobile: { type: String, defalut:""},
        addressLine:{ type: String, defalut: ""},
        city: { type: String, default:""},
        state: { type: String, default:""}
    },
    products:[
        {
            productId:{type: Schema.Types.ObjectId, ref:'Product'},
            title:{type:String, required:true},
            authorName:{type: String, default:""},
            price:{type:Number, required:true},
            itemsCount:{type: Number, default:1},
            img:{type:String, default:"*"},
            total:{type:Number, default:0}
        }
    ],
    billSummary:{
        paymentMethod:{type: String, default:"COD"},
        totalPrice: {type: Number, default:0}
    }
}

const orderSchema = new Schema(order,{
    timestamps: true
  });
const Order = mongoose.model('Order', orderSchema,);

export default Order;
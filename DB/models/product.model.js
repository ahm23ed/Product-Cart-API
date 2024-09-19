import mongoose, { model, Schema } from "mongoose";


const productSchema = new Schema({
    id:mongoose.Types.ObjectId,
    name:{
        type: String,
        required: [true, 'name is required'],
        unique: [true, 'name must be unique value'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char'],
    },
    price:{
        type: Number,
        required: [true, 'price is required']
    },
    image:String,
    Quantity:{
        type:Number,
        required:[true,'quantity is required'],
    },
    salePrice:{
        type:Number,
        default:null
    }
},{
    timestamps:true
})

const productModel = model('Product',productSchema)
export default productModel
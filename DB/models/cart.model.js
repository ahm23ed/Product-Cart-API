import mongoose, { Schema, model } from "mongoose";
import { calculateCartTotals } from '../../Src/middleware/middleware.js'  

const cartItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
})

const cartSchema = new Schema({
    items: [cartItemSchema],
    subtotal: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});


cartSchema.pre('save', calculateCartTotals)

const CartModel = model('Cart', cartSchema)
export default CartModel

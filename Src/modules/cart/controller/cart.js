import CartModel from "../../../../DB/models/cart.model.js";
import productModel from "../../../../DB/models/product.model.js";
import { asynchandler } from "../../../Services/handleError.js";



export const addToCart = asynchandler(async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(400).json({ message: 'Product not found' })
        }
        let cart = await CartModel.findOne()
        if (!cart) {
            cart = new CartModel() 
        }
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save()
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})





export const removeFromCart = asynchandler(async (req, res) => {
    try {
        const { productId } = req.body
        let cart = await CartModel.findOne();
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' })
        }
        cart.items = cart.items.filter(item => item.product.toString() !== productId)
        await cart.save()
        
        res.status(200).json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


export const getCart = asynchandler(async (req, res) => {
    try {
        const cart = await CartModel.findOne().populate('items.product')
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' })
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

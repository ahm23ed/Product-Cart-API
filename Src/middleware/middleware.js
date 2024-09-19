import productModel from '../../DB/models/product.model.js'; 

export const calculateCartTotals = async function (next) {
    const cart = this
    let subtotal = 0
    for (const item of cart.items) {
        const product = await productModel.findById(item.product) 
        const productPrice = product.salePrice || product.price   
        subtotal += productPrice * item.quantity
    }

    cart.subtotal = subtotal
    cart.total = subtotal
    
    next()
}

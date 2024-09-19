
import cloudinary from '../../../Services/cloudinary.js'
import {asynchandler} from '../../../Services/handleError.js'
import {HME,myMulter,fileValidation} from '../../../Services/multer.js'
import productModel from '../../../../DB/models/product.model.js'


export const createProduct = asynchandler(
    async (req, res) => {
        try {
            const {name, price, image, Quantity, salePrice} = req.body
            if (!name || !price || !Quantity) {
                res.status(400).json({message:"name and price and Quantity are required "})
            }
            const product = new productModel({name, price, image, Quantity, salePrice})
            await product.save()
            res.status(201).json({message: "product created successfully "})
        } catch (error) {
            res.status(400).json({message:'err while creating product',error})
        }
    }
)





export const deleteProduct = asynchandler(
    async (req, res) => {
        try {
            const { id } = req.params
            const product = await productModel.findByIdAndDelete(id)
            if (!product) {
                return res.status(404).json({ message: "Product not found" })
            }
            res.status(200).json({ message: "Product deleted successfully" })
        } catch (error) {
            res.status(400).json({ message: 'Error while deleting product', error })
        }
    }
)


export const updateProduct = asynchandler(
    async (req, res) => {
        try {
            const { id } = req.params
            const { name, price, Quantity, salePrice } = req.body
            if (!name || !price || !Quantity) {
                return res.status(400).json({ message: "Name, price, and quantity are required" })
            }
            const product = await productModel.findByIdAndUpdate(
                id,
                { name, price, Quantity, salePrice },
                { new: true } 
            );
            if (!product) {
                return res.status(404).json({ message: "Product not found" })
            }
            res.status(200).json({ message: "Product updated successfully", product })
        } catch (error) {
            res.status(400).json({ message: 'Error while updating product', error })
        }
    }
)



export const addProductPic = [
    myMulter(fileValidation.image).single('productPic'),
    HME,
    asynchandler(async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'NEBULAX-Task/product-images'
            });

            if (product.imagePublicId) {
                await cloudinary.uploader.destroy(product.imagePublicId)
            }
            product.image = result.secure_url
            product.imagePublicId = result.public_id
            await product.save();
            res.status(201).json({
                message: 'Product image uploaded successfully',
                productImage: result.secure_url
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to upload product image',
                error: error.message
            })
        }
    })
]
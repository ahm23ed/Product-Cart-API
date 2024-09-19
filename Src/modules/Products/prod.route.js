import * as productController from './controller/product.js'
import  Router  from "express";
const router = Router()

router.post('/products', productController.createProduct)
router.delete('/products/:id',productController.deleteProduct)
router.put('/products/:id',productController.updateProduct)
router.post('/addProductPic/:id',productController.addProductPic)

export default router

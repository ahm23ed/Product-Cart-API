import * as cartController from './controller/cart.js'
import  Router  from 'express'
const router   = Router()



router.post('/add', cartController.addToCart)
router.delete('/remove', cartController.removeFromCart)
router.get('/', cartController.getCart)


export default router
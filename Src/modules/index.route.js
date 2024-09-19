import  cartRouter from './cart/cart.route.js'
import  productRouter from './Products/prod.route.js'
import express from 'express'

export const appRouter = (app)=>{
const baseUrl = process.env.BASEURL

app.use(express.json())


app.use(`${baseUrl}/product`, productRouter)
app.use(`${baseUrl}/cart`, cartRouter)
app.use('*', (req, res, next) => {
res.status(400).send("In-valid Routing Plz check url  or  method")
})

app.use((err,req,res,next)=>{
if(err){
res.status(err['cause']).json({ message: err.message, stack:err.stack })
}
})
}
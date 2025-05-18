const express=require('express')
const cors=require('cors')
const dotenv = require('dotenv').config()
const app = express()
const productRoutes = require('./products.js')
app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use("/products",productRoutes)
const port = Number(process.env.PORT)||5000
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})
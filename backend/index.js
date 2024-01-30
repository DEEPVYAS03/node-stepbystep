const express = require('express');
const app = express();

const cors = require('cors');

require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')

app.use(express.json())
app.use(cors())



app.post('/register', async (req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    res.send(result)


})
// user.save() is typically used to save or update a user document in the database.


app.post('/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            resp.send(user)
        }
        else {
            resp.send({ result: "Invalid username or password" })
        }
    }
    else {
        resp.send({ result: "Please enter username and password" })
    }
})


app.post('/addProduct', async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result)
})


app.get('/products', async (req, resp) => {
    let products = await Product.find()
    if (products.length > 0) {
        resp.send(products)
    }
    else {
        resp.send({ result: "No products found" })
    }
})


app.delete('/deleteProduct/:id', async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result)
})

app.get('/product/:id', async (req, resp) => {
    const product = await Product.findOne({ _id: req.params.id })
    if (product) {
        resp.send(product)
    }
    else {
        resp.send({ result: "Product not found" })
    }
})


app.put('/updateProduct/:id', async (req, resp) => {
    let update = await Product.updateOne(
        { _id: req.params.id },
        {
             $set: req.body 
        }
    )
    resp.send(update)

}
)

app.get('/search/:key',async(req,resp)=>{
    let result = await Product.find(
        {
            "$or":[
                {name:{$regex : req.params.key}},
                {category:{$regex : req.params.key}}
            ]
        }
    )
    resp.send(result)
}
)


app.listen(5000)
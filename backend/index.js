const express = require('express');
const app = express();

const cors = require('cors');

require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')

app.use(express.json())
app.use(cors())


const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm'

app.post('/register', async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    Jwt.sign(
        { result },
        jwtKey,
        { expiresIn: "2h" },
        (err, token) => {
            if (err) {
                resp.send({ result: 'No user found' })
            }

            resp.send({result, auth: token })
        }
    )


})
// user.save() is typically used to save or update a user document in the database.


app.post('/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            Jwt.sign(
                { user },
                jwtKey,
                { expiresIn: "2h" },
                (err, token) => {
                    if (err) {
                        resp.send({ result: 'No user found' })
                    }

                    resp.send({user, auth: token })
                }
            )

        }
        else {
            resp.send({ result: "Invalid username or password" })
        }
    }
    else {
        resp.send({ result: "Please enter username and password" })
    }
})


app.post('/addProduct',verifyToken, async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result)
})


app.get('/products',verifyToken, async (req, resp) => {
    let products = await Product.find()
    if (products.length > 0) {
        resp.send(products)
    }
    else {
        resp.send({ result: "No products found" })
    }
})


app.delete('/deleteProduct/:id',verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result)
})

app.get('/product/:id',verifyToken, async (req, resp) => {
    const product = await Product.findOne({ _id: req.params.id })
    if (product) {
        resp.send(product)
    }
    else {
        resp.send({ result: "Product not found" })
    }
})


app.put('/updateProduct/:id',verifyToken, async (req, resp) => {
    let update = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(update)

}
)

app.get('/search/:key', verifyToken,async (req, resp) => {
    let result = await Product.find(
        {
            "$or": [
                { name: { $regex: req.params.key } },
                { category: { $regex: req.params.key } }
            ]
        }
    )
    resp.send(result)
}
)


function verifyToken(req,resp,next){
    let token = req.headers['authorization']
    if(token){
        token=token.split(' ')[1]
        console.warn("middleware called ",token)
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                resp.status(401).send({result:'Invalid token'})
            }
            else{
                next();
            }
        })     
    }
    else{
        resp.status(403).send({result:'Please send token'})
    }
}


app.listen(5000)
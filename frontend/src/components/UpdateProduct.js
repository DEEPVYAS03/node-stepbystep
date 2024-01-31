import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useParams } from "react-router";
import { useNavigate } from "react-router";

const UpdateProduct = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams()


    // useParams isiliye use kiya kyuki humne updateProduct ke liye route me id pass kiya tha from ProductList.js Link mai id pass kiya tha isiliye useParams krke access kiya hai
    useEffect(() => {
       console.warn(params)
       getProduct()
    }, [])

    const getProduct = async () => {
        console.warn(params)
        let response = await axios.get(`http://localhost:5000/product/${params.id}`,{
            headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          })
        let data = await response.data
        setName(data.name)
        setPrice(data.price)
        setCategory(data.category)
        setCompany(data.company)
    }
    const updateProduct = async () => {
        let response = await axios.put(`http://localhost:5000/updateProduct/${params.id}`, { name, price, category, company },{
            headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          })
        console.log(response.data)
        navigate('/')
    }

    return (
        <div className="register">
            <h1>Update Product</h1>

            <input type="text" placeholder="Enter product name" className="inputBox"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />


            <input type="number" placeholder="Enter product price" className="inputBox"
                value={price}
                onChange={(e) => setPrice(e.target.value)}

            />


            <input type="text" placeholder="Enter product category" className="inputBox"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input type="text" placeholder="Enter product company" className="inputBox"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />



            <button onClick={updateProduct} className="btnStyle">Update Product</button>
        </div>
    )
}
export default UpdateProduct
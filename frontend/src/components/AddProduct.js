import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

const AddProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false)
    const [userId, setUserId] = useState('')

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('user-info'))
        console.warn(auth)
        setUserId(auth._id)
    }, [])

    const addProduct = async () => {

        if (!name || price === 0 || !company || !category) {
            setError(true)
            return false
        }

        const response = await axios.post('http://localhost:5000/addProduct', { name, price, category, company, userId },{
            headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          })
        const data = response.data
        console.warn(data)
    }

    return (
        <div className="register">
            <h1>AddProduct</h1>

            <input type="text" placeholder="Enter product name" className="inputBox"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            {
                error && !name &&
                <span className="invalid-input">
                    Enter valid name
                </span>
            }


            <input type="number" placeholder="Enter product price" className="inputBox"
                value={price}
                onChange={(e) => setPrice(e.target.value)}

            />

            {
                error && price === 0 &&
                <span className="invalid-input">
                    Enter valid price
                </span>
            }


            <input type="text" placeholder="Enter product category" className="inputBox"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            {
                error && !category &&
                <span className="invalid-input">
                    Enter valid category
                </span>
            }

            <input type="text" placeholder="Enter product company" className="inputBox"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            {
                error && !company &&
                <span className="invalid-input">
                    Enter valid company
                </span>
            }

            <button onClick={addProduct} className="btnStyle">Add Product</button>
        </div>
    )
}
export default AddProduct
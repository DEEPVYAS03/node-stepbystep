import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'

const ProductList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [setProducts])

  const getProducts = async () => {
    let response = await axios.get('http://localhost:5000/products')
    let data = await response.data
    setProducts(data)
    console.log(products)
  }

  const deleteProduct = async (id) => {
    let response = await axios.delete(`http://localhost:5000/deleteProduct/${id}`)
    let data = await response.data
    console.log(data)
    getProducts()
  }

  const searchHandle = async (e) => {
    console.log(e.target.value)
    let key = e.target.value
    if (key) {
      let response = await axios.get(`http://localhost:5000/search/${key}`)
      let data = await response.data
      if (data) {
        setProducts(data)
      }
      console.log(data)
    }
    else {
      getProducts()
    }

  }


  return (
    <div className="product-list">
      <input type="text" placeholder='Search product' className='searchbox' onChange={searchHandle} />

      <h3>Product List</h3>

      {
        products.length > 0 ?
          <>
            <ul>
              <li>S. no.</li>
              <li>Name</li>
              <li>Price</li>
              <li>Category</li>
              <li>Operation</li>
            </ul>

            {products.map((item, index) => (
              <ul key={index}>
                <li>{index + 1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>
                  <button onClick={() => deleteProduct(item._id)}>delete</button>

                  <Link to={`/update/${item._id}`}>Update</Link>

                </li>
              </ul>
            ))}
          </> :
          <h3>No product found</h3>
      }

    </div>
  );

}
export default ProductList
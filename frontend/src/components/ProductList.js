import React, { useEffect, useState } from 'react'

import axios from 'axios'

const ProductList = () => {
    const [products,setProducts] =useState('')

    useEffect(()=>{
        getProducts()
    },[])

    const getProducts =async()=>{
        let response = await axios.get('http://localhost:5000/products')
        let data = await response.data
        console.warn("products" + data)
        setProducts(data)
    }


  return (
    <div>
      <h3>ProductList</h3>
      <ul></ul>
    </div>
  

  )
}
export default ProductList
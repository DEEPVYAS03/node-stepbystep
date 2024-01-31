import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const collectData = async () => {
    // axios

    const response = await axios.post('http://localhost:5000/register', { name, email, password })
    const data = response.data
    console.warn(data.result)
    console.warn(data.auth)
    if (data) {
      localStorage.setItem('user-info', JSON.stringify(data.result))
      localStorage.setItem('token', JSON.stringify(data.auth))
      navigate('/login')
    }
  }

  useEffect(() => {
    let auth = localStorage.getItem('user-info')
    if (auth) {
      navigate('/')
    }
  },[])


  return (
    <div className='register'>
      <h1>Signup</h1>
      <input type="text" placeholder="Enter your name" className='inputBox' onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input type="text" placeholder="Enter your email" className='inputBox' onChange={(e) => setEmail(e.target.value)}
        value={email}

      />

      <input type="password" placeholder="Enter your password" className='inputBox'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
  
      <button type='button' className='btnStyle' onClick={collectData}>Sign Up</button>
    </div>
  )
}
export default Signup
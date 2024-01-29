import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    useEffect(() => {
        let auth = localStorage.getItem('user-info')
        if (auth) {
            navigate('/')
        }
    }, [])
    


    const handleLogin =async () => {
        
        const response = await axios.post('http://localhost:5000/login', { email, password })
        const data = response.data  
        if(data.name){
            localStorage.setItem('user-info', JSON.stringify(data))
            navigate('/')
        }
        else{
            alert('Invalid email or password')
        }
        console.warn(data)


    }
  return (
    <div className='register'>
        <h1>Login Component</h1>
        <input type='text' className='inputBox' placeholder='Enter your email' 
        onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' className='inputBox' placeholder='Enter your password' 
        onChange={(e)=>setPassword(e.target.value)}/>
        <button className='btnStyle' type='button'
        onClick={handleLogin}>Login</button>
    </div>
  )
}
export default Login
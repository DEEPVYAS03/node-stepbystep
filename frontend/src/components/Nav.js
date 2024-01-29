import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Nav = () => {
  const auth = localStorage.getItem('user-info')

  const navigate = useNavigate()
  const logout = () => {
    // console.warn('Logout')
    localStorage.clear()
  }


  return (
    <nav className='nav-ul'>
      {auth ? <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add product</Link>
        </li>
        <li>
          <Link to="/update">Update Product</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/logout" onClick={logout}>Logout ({JSON.parse(auth).name})</Link>
        </li>
      </ul>
        :
        <ul>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>}

    </nav>
  )
}
export default Nav
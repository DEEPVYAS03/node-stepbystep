
import './App.css';
import Nav from './components/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />} >
            <Route path='/' element={<h1>Product Listing Component</h1>} />
            <Route path='/add' element={<h1>Add Product Component</h1>} />
            <Route path='/update' element={<h1>Update Product Component</h1>} />
            <Route path='/logout' element={<h1>Logout </h1>} />
            <Route path='/profile' element={<h1>Edit Profile Component</h1>} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>

      </Router>
      {/* <Footer /> */}

    </div>
  );
}

export default App;

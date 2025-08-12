import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from './components/Footer';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';
import MyOrder from './pages/Myorder/MyOrder';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
      <ToastContainer />
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <Login setShowLogin={setShowLogin} />
        </div>
      )}
    <Navbar setShowLogin={setShowLogin}/>
    
    <Routes>
    <Route path='/' element={<Home />} />
    <Route  path='/cart' element={<Cart />}/>
    <Route path='/order' element={<Placeorder/>} />
    <Route path='/verify' element={<Verify/>} />
    <Route path='/myorder' element={<MyOrder/>} />

    </Routes>
    <Footer />
    </div>
  )
}

export default App

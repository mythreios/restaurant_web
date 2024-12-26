import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Global CSS
import './styles/global.css';

// Components
import Navbar from './components/navbar.jsx';

// Pages
import Home from './pages/home.jsx';
import NotFound from './pages/404.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Account from './pages/account.jsx';
import Cart from './pages/cart.jsx';

import { AuthProvider } from './context/authContext.jsx';
import { CartProvider } from './context/cartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <CartProvider>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/account' element={<Account />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </CartProvider>
  </StrictMode >
)

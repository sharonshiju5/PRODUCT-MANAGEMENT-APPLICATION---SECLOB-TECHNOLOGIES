import { createContext, useContext,useEffect  } from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Register from './componets/UserRegister'
import Login from './componets/UserLogin'
import Forgot from './componets/Forgot'
import Reset from './componets/ChaingePassword'
import Home from "./componets/Home"
import AddProduct from "./componets/Addproduct"
import Productview from "./componets/Productview"
import Wishlist from "./componets/Wishlist"

const ThemeContext = createContext(null);

function App() {
  const [user, setID] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("currentUser");
    
    if (token && savedUser) {
      setID(savedUser);
    }
  }, []);


  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", user);
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);


  return (
    <>
      <ThemeContext.Provider value={{user, setID}}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home setID={setID} />}  />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/forgot" element={<Forgot/>} />
            <Route path="/userchaingepass" element={<Reset/>} />
            <Route path="/addproduct" element={<AddProduct/>} />
            <Route path="/productview/:_id" element={<Productview/>} />
            <Route path="/wishlist" element={<Wishlist/>} />

            <Route path="*" element={
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                fontSize: '2rem',
                color: '#666'
              }}>
                <h1>404 - Page Not Found</h1>
                <p style={{fontSize: '1rem', marginTop: '10px'}}>
                  The page you're looking for doesn't exist.
                </p>
                <a href="/" style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  background: '#4CAF50',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px'
                }}>
                  Go Home
                </a>
              </div>
            } />
          </Routes>
        </BrowserRouter>


      </ThemeContext.Provider>

    </>
  )
}

export default App

import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Register from './componets/UserRegister'
import Login from './componets/UserLogin'
// const ThemeContext = createContext(null);

function App() {
  const [user, setID] = useState(null);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const savedUser = localStorage.getItem("currentUser");
    
  //   if (token && savedUser) {
  //     setID(savedUser);
  //   }
  // }, []);


  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem("currentUser", user);
  //   } else {
  //     localStorage.removeItem("currentUser");
  //   }
  // }, [user]);


  return (
    <>
      {/* <ThemeContext.Provider value={{user, setID}}> */}


        <BrowserRouter>
          <Routes>
            <Route path="/" />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </BrowserRouter>


      {/* </ThemeContext.Provider> */}

    </>
  )
}

export default App

import axios from "axios";
import apiPath from "../path.js";
import { useState } from "react";
import "./css/UserRegister.css"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { useEffect } from "react";



function Register() {
  const navigate=useNavigate()

  const [data, setData] = useState({ username: "", email: "", password: "" });
  
  console.log(data);
  const handelSubmit= async(e)=>{
    e.preventDefault();
    try {
        const res = await axios.post(`${apiPath()}/adduser`, data);
        console.log(data);
        if (res.status === 201) {
        setData({ username: "", email: "", password: ""}); 
          toast(res.data.msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
            });
            setTimeout(() => {
            navigate("/login");
            }, 2000);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg || "Something went wrong!");
    }
  }
    return(
        <div className="container">
            <div className="subcntr subcntr1">
                <div className="cntr-box">
                    <h1>Welcom Back!</h1>
                    <p>to keep conecte with us pleace <br/> login with your personal info</p>
                    <button className="btn1" onClick={()=>{navigate("/login")}}>sign in</button>
                </div>
            </div>
            <div className="subcntr subcntr2">
                <div className="cntr-box">
                    <div className="cntr-box2">
                        <h1 className="h1">create account</h1>
                        <form action="" className="signup-form" id="form" onSubmit={handelSubmit}>
                            <input 
                                type="text"
                                className="name"
                                name="username"
                                onChange={(e) => setData((pre) => ({ ...pre, [e.target.name]: e.target.value }))}
                                value={data.username}
                            />

                            <input
                            type="email"
                            className="email"
                            name="email"
                            onChange={(e) => setData((pre) => ({ ...pre, [e.target.name]: e.target.value }))}
                            value={data.email}
                            />
                            <input
                            type="password"
                            className="psw"
                            name="password"
                            onChange={(e) => setData((pre) => ({ ...pre, [e.target.name]: e.target.value }))}
                            value={data.password}
                            />
                            <u className="hidden">
                                <h5 onClick={()=>{navigate("/login")}}>sign in</h5>
                            </u>
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick={false}
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                            <button className="btn1 btn2" type="submit">sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
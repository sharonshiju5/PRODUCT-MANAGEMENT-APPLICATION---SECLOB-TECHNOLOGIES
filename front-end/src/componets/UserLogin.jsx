import axios from "axios";
import apiPath from "../path.js";
import { useState } from "react";
import "./css/UserRegister.css"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";



function Register() {
  const navigate=useNavigate()

  const [data, setData] = useState({ email: "", password: "" });
  
  console.log(data);
  const handelSubmit= async(e)=>{
    e.preventDefault();
    try {
        const res = await axios.post(`${apiPath()}/loginuser`, data);
        console.log(data);
        if (res.status === 200) {
        const { token, msg } = res.data; 
            if (token) {
                console.log("Token received:", token);
                localStorage.setItem("token", token);
                toast.success(msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }); 
                setData({ email: "", password: "" });
                setTimeout(() => navigate("/"), 3000);
            }  
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg || "Something went wrong!");
    }
  }
    return(
        <div className="container">
            
            <div className="subcntr subcntr2">
                <div className="cntr-box">
                    <div className="cntr-box2">
                        <h1 className="h1">sign in <br/> to your account</h1>
                        <form action="" className="signup-form" id="form" onSubmit={handelSubmit}>

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
                                <h5 onClick={()=>{navigate("/register")}}>sign up</h5>
                            </u>
                            <u>
                                <h3 onClick={()=>{navigate("/forgot")}}>forgot password</h3>
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
                            <button className="btn1 btn2" type="submit">sign in</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="subcntr subcntr1">
                <div className="cntr-box">
                    <h1>Hello Friend</h1>
                    <p>Enter your personal details and <br/> start your journy</p>
                    <button className="btn1" onClick={()=>{navigate("/register")}}>sign up</button>
                </div>
            </div>
        </div>
    )
}

export default Register
import { useState,useEffect } from "react";
import Nav from "./Navbar"
import axios from "axios";
import apiPath from "../path";


function Home({ setID }) {
  let [user, setUser] = useState(null);
    const getuser=async ()=>{
        const token = localStorage.getItem("token");
        console.log("Token before request:", token);

        try {
            const res = await axios.get(`${apiPath()}/home`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            });

        if (res.status === 200) {
          console.log("User Data:", res.data);
          setUser(res.data.username);
          setID(res.data.username);
          console.log(res.data);
          
          localStorage.setItem("currentUser", res.data.username);
        }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error);
            if (error.response && error.response.data.msg === "Login time expired please login again") {
                toast.error("Session expired! Please login again.");
                localStorage.removeItem("token");
                localStorage.removeItem("currentUser");
                setTimeout(() => navigate("/login"), 3000);
            }
        }
    }

    console.log(user,"ffffff");
    
    useEffect(() => {
        getuser();
    },[]);
    return(
        <>
            <Nav user={user} setID={setID}
            //  wishlistCount={wishlist.length} 
             />
            
        </>
    )
}
export default Home
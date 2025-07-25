import { useState, useEffect } from "react";
import "./css/Nav.css";
import axios from "axios";
import apiPath from "../path";
import { Link } from "react-router";

function Nav({ user, setID, wishlistCount = 0 }) {
  const [search, setsearch] = useState("");
  const [product, setProducts] = useState([]);



  
  const searchProduct = async () => {
    try {
      const res = await axios.post(`${apiPath()}/searchproduct`, { search });
      if (res.status === 200) {
        console.log(res);
        
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search.trim() !== "") {
      searchProduct();
    } else {
      setProducts([]);
    }
  }, [search]);
console.log(search);

  return (
    <nav>
      <div className="sub-nav nav-sec1">
      <div className="search-wrapper">
        <input
          type="text"
          onChange={(e) => setsearch(e.target.value)}
          value={search}
          placeholder="Search anything"
        />
        <button className="search-btn">Search</button   >
    
        {/* Dropdown below input */}
        {Array.isArray(product) && product.length > 0 && (
          <div className="dropdown-results">
            {product.map((p) => (
              <Link to={`/productview/${p._id}`} key={p._id}>
                <div className="dropdown-item">
                  <img src={p.images?.[0]} alt={p.title} />
                  <span>{p.title}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>


      <div className="sub-nav nav-sec2">
        <Link to={"/wishlist"}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/3870/3870922.png"
          className="nav-icon"
          alt=""
          />
        </Link>
        <Link to={"/login"}>
        <span
          onClick={() => {
            localStorage.removeItem("tokrn");         
            localStorage.removeItem("user_id");       
            localStorage.removeItem("currentUser");   
            window.location.href = "/login";          
          }}
        >logout</span>
        </Link>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4296/4296929.png"
          className="nav-icon"
          alt=""
        />
        <span>Cart</span>
        {user && <span>Hello {user}</span>}
      </div>
    </nav>
  );
}

export default Nav;

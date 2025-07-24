import { useState,useEffect } from "react";
import Nav from "./Navbar"
import axios from "axios";
import apiPath from "../path";
import "./css/Home.css"
import { FaStar, FaChevronDown, FaChevronRight , FaHeart, FaRegHeart } from "react-icons/fa";
import { Link,useNavigate } from "react-router";




function Home({ setID }) {
    let [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;
    const navigate=useNavigate()

    const getuser=async ()=>{

        const token = localStorage.getItem("token");
        if (!token) {
          alert("session expired")
          setTimeout(() => {
            navigate("/login")
          }, 1000);
        }
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
          localStorage.setItem("user_id", res.data.user_id);

          
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

    // category section
    const [openCategory, setOpenCategory] = useState(null);

    const toggleCategory = (category) => {
      setOpenCategory(openCategory === category ? null : category);
    };

    // product section

    const fetchProduct = async (page) => {
    try {
        const res = await axios.get(`${apiPath()}/fetchproduct?page=${page}&limit=${limit}`);
        const { products, totalPages } = res.data;
        setProducts(products);
        setTotalPages(totalPages);
        setCurrentPage(page);
    }catch (error) {
        console.log("Fetch error:", error);
        }
    };
    useEffect(()=>{
        fetchProduct()
    },[])

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
          fetchProduct(page);
        }
    };

    // wishlist section 
    // wishlist section 

    const addWishlist = async (product_id) => {
        const user=localStorage.getItem("user_id")
        try {
            console.log(user    );
            
            const res = await axios.post(`${apiPath()}/addwishlist`,{ product: product_id, user: user,})
            console.log(res);
            alert("succesfully added")
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <>
            <Nav user={user} setID={setID}
            //  wishlistCount={wishlist.length} 
             />
            <div className="home-sec">
                <div className="home-nav">
                    <div className="section section1">
                        <span>Home</span>
                        <span><img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="" /></span>
                    </div>
                    <div className="section section2">
                        <button>Add category</button>
                        <button>Add sub category</button>
                        <Link to={"/addproduct"}>
                        <button>Add product</button>
                        </Link>
                    </div>
                </div>
                <div className="filter-sec">
                    <h3>categories</h3>
                    <h3>All categories</h3>

                    <div className="category-menu">
                        <h4 onClick={() => toggleCategory("Laptop")} className="category-title">
                          Laptop {openCategory === "Laptop" ? <FaChevronDown /> : <FaChevronRight />}
                        </h4>
                        {openCategory === "Laptop" && (
                          <ul className="subcategory">
                            <li>
                              <label className="custom-checkbox">
                                <input type="checkbox" id="hp" />
                                <span className="checkmark"></span>
                                Hp
                              </label>
                            </li>
                            <li>
                              <label className="custom-checkbox">
                                <input type="checkbox" id="dell" />
                                <span className="checkmark"></span>
                                Dell
                              </label>
                            </li>
                          </ul>
                        )}
                    </div>
                    
                </div>
                <div className="product-sec">
                  {products.map((product) => (
                      <div className="product-card" key={product._id}>
                      <div className="product-img-div">
                        <Link to={`/productview/${product._id}`} >
                        <img
                          className="product-img"
                          src={product.images?.[0] ?? "default-image.jpg"}
                          alt="product"
                          />
                        </Link>
                        <FaRegHeart className="heart-icon" onClick={()=>{addWishlist(product._id)}} style={{ color: "gray" }} />
                      </div>
                      <div className="product-details">
                        <h3>{product.title}</h3>
                        <span>{product.variants?.[0]?.price ?? "N/A"}</span>
                        <br />
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="star" />
                        ))}
                      </div>
                    </div>
                  ))}

                    <div className="pagination">
                  
                        <div className="pagination-controls">
                          {[...Array(totalPages)].map((_, idx) => (
                              <button
                              key={idx + 1}
                              className={currentPage === idx + 1 ? "active-page" : ""}
                              onClick={() => handlePageClick(idx + 1)}
                              >
                              {idx + 1}
                            </button>
                          ))}
                        </div>
                      
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home
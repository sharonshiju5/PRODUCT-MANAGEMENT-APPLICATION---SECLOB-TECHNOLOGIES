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

  const [category, setCategory] = useState("");
  const [showcategory, setshowcategory] = useState(false);

  const [categories, setcategies] = useState([]);
  const [subcategory, setSubcategory] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [showsubcategory, setshowsubcategory] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

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

    // const toggleCategory = (category) => {
    //   setOpenCategory(openCategory === category ? null : category);
    // };

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


    const handleAdd = async() => {
      try {
        const res = await axios.post(`${apiPath()}/category/add`, { category });
        if (res.status === 200) {
          alert("Category added successfully");
          setTimeout(() => {
            setshowcategory(false)
          }, 1500);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };


    const fetchcategory=async()=>{
      try {
        const res = await axios.get(`${apiPath()}/category/fetch`);
        console.log(res);
        if (res.status==200) {
          setcategies(res.data.categories)
        }

      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      fetchcategory()
    },[])



      const Addsubcategory = async () => {
      // if (!selectedCategory || !subcategory) {
      //   alert("Please select a category and enter a subcategory name.");
      //   return;
      // }
      try {
        const res = await axios.post(`${apiPath()}/subcategory/add`, {
          category: selectedCategory,
          subcategory: subcategory,
        });
      
        if (res.status === 200) {
          setshowsubcategory(false)
          alert("Subcategory added successfully");
          fetchcategory()
          setSelectedCategory("");
          setSubcategory("")
          setSubcategory("");
        }
      } catch (error) {
        console.error("Error adding subcategory:", error);
        alert("Failed to add subcategory");
      }
    };



    const [subcategories, setSubcategories] = useState({});

    const toggleCategory = async (categoryId) => {
      if (openCategory === categoryId) {
        setOpenCategory(null);
      } else {
        setOpenCategory(categoryId);
      
        // Only fetch if not already loaded
        if (!subcategories[categoryId]) {
          try {
            const res = await axios.post(`${apiPath()}/subcategory/fetch`, { categoryId });

            setSubcategories((prev) => ({
              ...prev,
              [categoryId]: res.data.subcategories,
            }));
          } catch (err) {
            console.error("Failed to fetch subcategories", err);
          }
        }
      }
    };
  
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
                        <button onClick={()=>{setshowcategory(true)}}>Add category</button>
                        <button onClick={()=>{setshowsubcategory(true)}}>Add sub category</button>
                        <Link to={"/addproduct"}>
                        <button>Add product</button>
                        </Link>
                    </div>
                </div>
                <div className="filter-sec">
                  <h3>categories</h3>
                  <h3>All categories</h3>
                  {categories.map((catego) => (
                    <div className="category-menu" key={catego._id}>
                      <h4
                        onClick={() => toggleCategory(catego._id)}
                        className="category-title"
                      >
                        {catego.category}{" "}
                        {openCategory === catego._id ? <FaChevronDown /> : <FaChevronRight />}
                      </h4>
                                        
                      {openCategory === catego._id && (
                        <ul className="subcategory">
                          {(subcategories[catego._id] || []).map((subcat) => (
                            <li key={subcat._id}>
                              <label className="custom-checkbox">
                                <input type="checkbox" id={subcat._id} />
                                <span className="checkmark"></span>
                                {subcat.subcategory}
                              </label>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                      
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
            <div>
              {showcategory?(
                <div className="modal-overlay">
                  <div className="modal-container">
                    <h2>Add Category</h2>
                    <input
                      type="text"
                      placeholder="Enter category name"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      />
                    <div className="modal-buttons">
                      <button className="add-btn" onClick={handleAdd}>ADD</button>
                      <button className="discard-btn" onClick={()=>{setshowcategory(false)}} >DISCARD</button>
                    </div>
                  </div>
                </div>
              ):(
                <></>
              )
                    }
            </div>
            <div>
              {showsubcategory?(
              <div className="modal-overlay">
                <div className="modal-container">
                  <h2>Add SubCategory</h2>

                  {/* Category Select Dropdown */}
                  <select
                    required
                    className="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                    {/* <option value="" disabled>Select Category</option> */}
                    {categories.map((cat) => (
                      <option className="option-category" key={cat._id} value={cat._id}>
                        {cat.category}
                      </option>
                    ))}
                  </select>



                  {/* SubCategory Input */}
                  <input
                    type="text"
                    placeholder="Enter subcategory name"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    />

                  <div className="modal-buttons">
                    <button className="add-btn" onClick={Addsubcategory}>ADD</button>
                    <button className="discard-btn" onClick={()=>{setshowsubcategory(false)}}>DISCARD</button>
                  </div>
                </div>
              </div>
              ):(
              <></>)}

            </div>
        </>
    )
}
export default Home
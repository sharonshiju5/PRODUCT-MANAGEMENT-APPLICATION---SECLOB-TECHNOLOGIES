import React, { useState } from 'react';
import { Heart, ChevronRight, LineSquiggle } from 'lucide-react';
import "./css/Productview.css"
import Nav from './Navbar';
import { Link ,useParams} from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import apiPath from '../path';


const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product,setProduct]=useState("")
  const [selectedRam, setSelectedRam] = useState('');

 

  const adjustQuantity = (increment) => {
    setQuantity(prev => Math.max(1, prev + increment));
  };
  const { _id } = useParams();
console.log(_id);

  const FetchSingleProduct=async()=>{
    try {
        const res = await axios.post(`${apiPath()}/productview`,{_id});
        console.log(res,"huu");
        if (res.status==200) {
            setProduct(res.data.product)
        }
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    FetchSingleProduct()
  },[])

useEffect(() => {
  if (product?.variants?.length > 0) {
    setSelectedRam(product.variants[0].ram);
  }
}, [product]);


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

  return (
    <>
    <Nav/>
      <div>

        {/* Header */}

        {/* Main Content */}
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to={"/"} className="breadcrumb-item">
            Home
            </Link>
            <ChevronRight size={16} />
            <span className="breadcrumb-current">Product details</span>
          </nav>

          {/* Product Section */}
          <div className="product-container">
            {/* Product Images */}
            {product?.images && product.images.length > 0 && (
              <div className="product-images">
                <div className="main-image-container">
                  <img 
                    src={product.images[0]} 
                    alt="Product"
                    className="main-image"
                  />
                </div>
                        
                <div className="thumbnail-container">
                  {product.images.slice(1).map((image, index) => (
                    <div 
                      key={index}
                      className={`thumbnail ${selectedImage === index + 1 ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index + 1)}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Product Info */}
            <div className="product-info">
              <h1 className="product-title">{product.title}</h1>
              <div className="product-price">
              ₹{product.variants?.find(v => v.ram === selectedRam)?.price || "--"}
            </div>

              
              <div className="availability-section">
                <div className="availability">
                  <span className="availability-label">Availability:</span>

                    {product.variants?.reduce((total, v) => total + v.quantity, 0) > 0 ? (
                      <span className="in-stock">
                        <svg className="stock-icon" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        In stock
                      </span>
                    ) : (
                      <span className="out-of-stock" style={{ color: 'red', fontWeight: 'bold' }}>
                        Out of stock
                      </span>
                    )}

                </div>
                <div className="stock-message">
                  Hurry up! only {
                    product.variants?.reduce((total, variant) => total + variant.quantity, 0)
                  } products left in stock!
                </div>

              </div>

              <div className="product-options">
                <div className="option-group">
                  <label className="option-label">Ram:</label>
                  <div className="ram-options">

                    {product.variants?.map((variant) => (
                      <button
                        key={variant._id}
                        className={`ram-option ${selectedRam === variant.ram ? 'selected' : ''}`}
                        onClick={() => setSelectedRam(variant.ram)}
                      >
                        {variant.ram}
                      </button>
                    ))}

                  </div>
                </div>

                <div className="option-group">
                  <div className="quantity-section">
                    <label className="option-label">Quantity :</label>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => adjustQuantity(-1)}
                      >
                        -
                      </button>
                      <input 
                        type="text"
                        className="quantity-input"
                        value={quantity}
                        readOnly
                      />
                      <button 
                        className="quantity-btn"
                        onClick={() => adjustQuantity(1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="product-actions">
                <button className="btn btn-primary">Edit product</button>
                <button className="btn btn-secondary">Buy it now</button>
                <button className="wishlist-btn">
                  <Heart className="wishlist-icon" onClick={()=>{addWishlist(product._id)}} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
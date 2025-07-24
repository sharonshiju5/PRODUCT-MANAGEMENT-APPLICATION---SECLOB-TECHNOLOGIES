import React, { useEffect, useState } from 'react';
import './css/Wishlist.css';
import axios from 'axios';
import apiPath from '../path';

const WishlistDisplay = () => {
  const [wishlist,setwishlist] = useState([]);

  const user= localStorage.getItem("user_id")
  const fetchwishlist=async()=>{
    try {
        const res = await axios.post(`${apiPath()}/fetchwishlist`, {user})
        console.log(res);
        if (res.status==200) {
          setwishlist(res.data.products)
        }

    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    fetchwishlist()
  },[])



  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Wishlist</h1>
      
      <div className="wishlist-list">
        {wishlist.map(item => (
          <div key={item._id} className="wishlist-item">
            <div className="item-info">
              <h3 className="item-name">{item.title}</h3>
              <p className="item-price">{item.variants[0].price}</p>
            </div>
            <img className='wishlist-img' src={item.images[0]} alt="" />
          </div>
        ))}
      </div>

      <div className="wishlist-footer">
        <p>{wishlist.length} items</p>
      </div>
    </div>
  );
};

export default WishlistDisplay;
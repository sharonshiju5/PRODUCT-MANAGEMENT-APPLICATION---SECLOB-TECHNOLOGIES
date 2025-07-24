import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import axios from 'axios';
import "./css/Addproduct.css";
import apiPath from '../path';
import { Link } from 'react-router';

const AddProductModal = () => {
  const [title, setTitle] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setcategies] = useState([]);

  const [variants, setVariants] = useState([
    { ram: '', price: '', quantity: 1 }
  ]);
  const [images, setImages] = useState([]);

  const updateVariant = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = field === 'quantity' ? parseInt(value) : value;
    setVariants(newVariants);
  };

  const adjustQuantity = (index, increment) => {
    const newVariants = [...variants];
    const newQty = Math.max(1, newVariants[index].quantity + increment);
    newVariants[index].quantity = newQty;
    setVariants(newVariants);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addVariantRow = () => {
    setVariants([...variants, { ram: '', price: '', quantity: 1 }]);
  };

  const AddProduct = async (e) => {
    e.preventDefault();
    const productData = {
      title,
      subCategory: subcategory,
      description,
      variants,
      images
    };

    try {
      const res = await axios.post(`${apiPath()}/addproduct`, productData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      alert("Product added successfully!");
      setTitle('');
      setSubcategory('');
      setDescription('');
      setVariants([{ ram: '', price: '', quantity: 1 }]);
      setImages([]);
    } catch (error) {
      console.log("Error adding product:", error);
    }
  }

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
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add Product</h2>
        </div>

        <form onSubmit={AddProduct}>
          <div className="form-group">
            <label className="form-label">Title :</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="variants-section">
            <label className="form-label">Variants :</label>
            {variants.map((variant, index) => (
              <div key={index} className="variant-row">
                <div className="variant-input-group">
                  <span className="variant-label">Ram:</span>
                  <input
                    type="text"
                    className="variant-input"
                    value={variant.ram}
                    onChange={(e) => updateVariant(index, 'ram', e.target.value)}
                    required
                  />
                </div>
                <div className="variant-input-group">
                  <span className="variant-label">Price:</span>
                  <input
                    type="number"
                    className="variant-input"
                    value={variant.price}
                    onChange={(e) => updateVariant(index, 'price', e.target.value)}
                    required
                  />
                </div>
                <div className="variant-input-group">
                  <span className="variant-label">QTY:</span>
                  <div className="quantity-control">
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => adjustQuantity(index, -1)}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <input
                      type="text"
                      className="quantity-input"
                      value={variant.quantity}
                      readOnly
                    />
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => adjustQuantity(index, 1)}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="add-variants-btn" onClick={addVariantRow}>
              Add variants
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Sub category :</label>

            <div className="select-wrapper">
              <select
                className="form-select"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                required
              >
                    {/* <option value="" disabled>Select Category</option> */}
                  {categories.map((cat) => (
                    <option className="option-category" key={cat._id} value={cat._id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              <ChevronDown size={16} className="select-icon" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description :</label>
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="upload-section">
            <label className="form-label">Upload image:</label>
            <div className="upload-grid">
              {images.map((src, idx) => (
                <div className="upload-item" key={idx}>
                  <img src={src} alt={`preview-${idx}`} />
                </div>
              ))}
              <div className="upload-item">
                <label htmlFor="file-upload" className="upload-placeholder">
                  <Upload size={24} />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Link to={"/"}>
                <button type="button" className="btn btn-secondary" >
                  DISCARD
                </button>
            </Link>
            <button type="submit" className="btn btn-primary">
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
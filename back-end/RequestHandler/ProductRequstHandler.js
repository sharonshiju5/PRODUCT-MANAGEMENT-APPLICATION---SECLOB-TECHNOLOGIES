import Product from "../models/ProductModel.js";
import Wishlsit from "../models/WishlistModel.js";
import categorySchema from "../models/CategoryModel.js";
import subCategorySchema from "../models/SubCategoryModel.js";
import mongoose from 'mongoose';

export async function addproduct(req, res) {
  try {
    const { title, subCategory, description, variants,images } = req.body;

    // const images = req.files?.map(file => file.filename);

    const parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;

    const product = new Product({
      title,
      subCategory,
      description,
      images,
      variants: parsedVariants,
    });

    await product.save();
    res.status(201).send({ msg: "Product added successfully", product });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
}


export async function fetchproduct(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;        
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.status(200).send({
      msg: "Successfully fetched",
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.log("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}


export async function searchproduct(req, res) {
  try {
    const { search } = req.body;

    if (!search) {
      return res.status(400).json({ error: "Search term is required" });
    }

    const products = await Product.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { subCategory: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Failed to search products" });
  }
}



export async function singleproduct(req,res) {
    try {
        const{_id}=req.body
        console.log(_id);
        
        const product = await Product.findById(_id)
        console.log(product);
        
        res.status(200).send({msg:"succefully fetched",product})
    } catch (error) {
        console.log(error);
    }
}


export async function addwishlist(req, res) {
  try {
    const { product, user } = req.body;

    if (!product || !user) {
      return res.status(400).json({ error: "Product and User are required" });
    }

    const newWish = await Wishlsit.create({ product, user });

    res.status(201).send({ message: "Product added to wishlist", wishlist: newWish });
  } catch (error) {
    console.error("Wishlist error:", error);
    res.status(500).send({ error: "Failed to add to wishlist" });
  }
}



export async function fetchwishlist(req, res) {
  try {
    const { user } = req.body;

    if (!user) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Step 1: Find all wishlists for the user
    const wishlists = await Wishlsit.find({ user });

    // Step 2: Extract product IDs from wishlists
    const productIds = wishlists.map(w => w.product._id || w.product);

    // Step 3: Fetch products using those IDs
    const products = await Product.find({ _id: { $in: productIds } });

    // Step 4: Send response with products and wishlist info
    res.status(200).send({ products });
  } catch (error) {
    console.error("Fetch wishlist error:", error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
}

export async function removewishlist(req, res) {
  try {
    const { user, product_id } = req.body;

    // Validate user ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const deleted = await Wishlsit.findOneAndDelete({ user, product_id });

    if (!deleted) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (error) {
    console.log("Remove wishlist error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}



export async function createcategory(req,res) {
    try {
        const{category}=req.body
        const categories = await categorySchema.create({ category});
        res.status(200).send({msg:"category created"})
        
    } catch (error) {
        console.log(error);
    }
}

export async function fetchcategory(req,res) {
  try {
    const categories=await categorySchema.find()
    res.status(200).send({msg:"category fetched",categories})
    
  } catch (error) {
    console.log(error);
  }
}

export async function createsubcategory(req,res) {
    try {
        const{category,subcategory}=req.body
        const categories = await subCategorySchema.create({ category,subcategory});
        res.status(200).send({msg:"category created"})
        
    } catch (error) {
        console.log(error);
    }
}

export async function fetchsubcategory(req, res) {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const subcategories = await subCategorySchema.find({ category: categoryId });

    res.status(200).send({msg:"Subcategories found",subcategories,});
  } catch (error) {
    console.log("Fetch subcategory error:", error);
    res.status(500).send({ message: "Failed to fetch subcategories" });
  }
}
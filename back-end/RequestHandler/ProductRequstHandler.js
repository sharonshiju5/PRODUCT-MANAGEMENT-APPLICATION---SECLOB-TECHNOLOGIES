import Product from "../models/ProductModel.js";
import Wishlsit from "../models/WishlistModel.js";

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

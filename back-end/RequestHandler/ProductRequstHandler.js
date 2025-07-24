// controllers/productController.js
import Product from "../models/ProductModel.js";

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


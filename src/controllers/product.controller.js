
import Product from "../models/product.models.js";
import asynchandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js"; 
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create a new product
const createProduct = asynchandler(async (req, res,) => {  

  try {
    const { name, price,expirydate,description,category } = req.body; 

    if (
      [name, price,expirydate].some((field) => {
        !field || field.trim() === "";
      })
    ) {
      throw new ApiError(400, "All fields are required");  
    }
    const productImage = req.file; 
    console.log("this is req",req.file);
    const productImageLocalPath = productImage ? productImage.path :null;
    console.log("THis is url",productImageLocalPath) ;

    const productPath = await uploadOnCloudinary(productImageLocalPath)
    console.log("THis is product path ",productPath);

    const newProduct = new Product({
      name,
      price,
      expirydate,
      description,
      category,
      image:productPath.url,
    });

    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json(new ApiResponse(201, savedProduct, "Product created successfully"));
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw new ApiError(500, error.message || "Error creating product");
  }
});

// Get all products
const getAllProducts = asynchandler(async (req, res) => {
  try {
    const products = await Product.find().sort({createdAt: -1});
    if (products.length === 0) {
      throw new ApiError(404, "No products found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw new ApiError(500, error.message || "Error fetching products");
  }
});

// Get a single product by ID
const getProductById = asynchandler(async (req, res) => {
  try {
    // const  {id} = req.params;
    const productId= req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, product, "Product fetched successfully"));
  } catch (error) {
    console.error("Error fetching product:", error.message);
    throw new ApiError(500, error.message || "Error fetching product");
  }
});

// Update a product by ID
const updateProduct = asynchandler(async (req, res) => {
  try {
    const  productId = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      throw new ApiError(404, "Product not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedProduct, "Product updated successfully")
      );
  } catch (error) {
    console.error("Error updating product:", error.message);
    throw new ApiError(500, error.message || "Error updating product");
  }
});

// Delete a product by ID
const deleteProduct = asynchandler(async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new ApiError(404, "Product not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "Product deleted successfully"));
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw new ApiError(500, error.message || "Error deleting product");
  }
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}; 
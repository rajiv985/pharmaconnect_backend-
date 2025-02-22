import Cart from "../models/cart.models.js";
import Product from "../models/product.models.js";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asynchandler from "../utils/asynchandler.js";

const addToCart = asynchandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  if (!productId) {
    throw new ApiError(400, "Product ID are required.");
  }

  const productData = await Product.findById(productId);
  if (!productData) {
    throw new ApiError(400, `Product ${productId} is invalid.`);
  } 
  
  let totalAmount=0;
  let newCart = await Cart.findOne({ userId });
  if (!newCart) {
    newCart = new Cart({
      userId, 
      products: [],
      totalAmount,
    });
  }

  // Check if the product already exists in the cart
  const existingProductIndex = newCart.products.findIndex(
    (item) => item.productId.toString() === productId
  );
  console.log(productData); 
  
  if (existingProductIndex!==-1){
    throw new ApiError(400,"product already exist in cart")
  }else{
    newCart.products.push({
      productId:productData.id,
      productName:productData.name,
      productprice:productData.price,
    });
    console.log("bjjgjhg");
    const productsPrice=Number(productData.price);
    newCart.totalAmount=Number(newCart.totalAmount)+productsPrice;
  }
  

  const savedCart = await newCart.save();
  res
    .status(201)
    .json(new ApiResponse(201, savedCart, "Cart created successfully."));
}); 



//get cart
const getCartById = asynchandler(async (req, res) => {
  try {
    const cartId = req.params.id;

    const userId = req.user._id;

    const cart = await Cart.findOne({userId:userId});
    if (!cart) {
      throw new ApiError(404, "Cart not found.");
    }
    {
      res
        .status(200)
        .json(new ApiResponse(200, cart, "Cart fetched successfully."));
    }
  } catch (error) {
    console.log("Error during fetching cart: ", error.message);
    throw new ApiError(500, error.message || "Error fetching cart");
  }
});

const deleteProductFromCart = asynchandler(async (req, res) => {
  const { productId } = req.body; 
  const userId = req.user.id; 

  if (!productId) {
    throw new ApiError(400, "Product ID is required.");
  }

  const newCart = await Cart.findOne({ userId });
  if (!newCart) {
    throw new ApiError(404, "Cart not found for the user.");
  }

  const productIndex = newCart.products.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (productIndex === -1) {
    throw new ApiError(404, "Product not found in the cart.");
  }

  newCart.products.splice(productIndex, 1);

  const updatedCart = await newCart.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedCart, "Product removed from cart successfully.")
    );
});


const deleteCart = asynchandler(async (req, res) => {
  const cartId = req.params.id;

  const deleteCart = await Cart.findByIdAndDelete(cartId);
  if (!deleteCart) {
    throw new ApiError(404, "Cart not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deleteCart, "Cart deleted successfully."));
});

export { addToCart, getCartById, deleteProductFromCart, deleteCart };
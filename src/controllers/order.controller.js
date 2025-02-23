import Order from "../models/order.models.js";
import Cart from "../models/cart.models.js";
import User from "../models/user.models.js"; 
import Product from "../models/product.models.js";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asynchandler from "../utils/asynchandler.js";

const createOrder = asynchandler(async (req, res) => {
  const { shippingAddress } = req.body;
  const userId = req.user.id;

  // Fetch user's cart
  const cart = await Cart.findOne({ userId }).populate("products.productId");  
  if (!cart || cart.products.length === 0) {
    throw new ApiError(400, "Your cart is empty."); 
  }

  let totalAmount = 0;
  const orderedProducts=[];
  for (const item of cart.products) {
    const productData = await Product.findById(item.productId);

    if (!productData) {
      throw new ApiError(400, `Product ${item.productId} is invalid.`);
    }
    totalAmount += Number(productData.price);
    orderedProducts.push({
      productId: productData.id,
      productName: productData.name,
      productPrice: productData.price,
    });
  }

  // Create order
  const newOrder = new Order({
    userId,
    products: orderedProducts,
    totalAmount,
    shippingAddress,
    status: "Pending",
    paymentStatus: "Pending",
  });


  //if order is already been placed
  // const existingOrder= await Order.findOne({ userId});
  // if (existingOrder) {
  //   throw new ApiError(400, "Order has been placed.");
  // }

  const savedOrder = await newOrder.save();

  // Clear user's cart after placing the order
  await Cart.findByIdAndDelete(cart.id);

  res
    .status(201)
    .json(new ApiResponse(201, savedOrder, "Order created successfully."));
});

// Get an order by ID
const getOrderById = asynchandler(async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate("userId");//populate= full product details

    if (!order) {
      throw new ApiError(404, "Order not found.");
    }else {
      res
        .status(200)
        .json(new ApiResponse(200, order, "Order fetched successfully."));
    }
  } catch (error) {
    console.log("Error during fetching order: ", error.message);
    throw new ApiError(500, error.message || "Error fetching order");
  }
});

const getAllOrder = asynchandler(async (req, res) => {
  try {
    const order = await Order.find().sort({createdAt: -1});
    if (order.length === 0) {
      throw new ApiError(404, "No order found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, order, "order fetched successfully"));
  } catch (error) {
    console.error("Error fetching order:", error.message);
    throw new ApiError(500, error.message || "Error fetching order");
  }
});

// Update order status
const updateOrder = asynchandler(async (req, res) => {
  try {
    const orderId = req.params.id; 
    const updateData = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });
    if (!updatedOrder) {
      throw new ApiError(404, "Order not found.");
    }else{
      res
        .status(200)
        .json(
          new ApiResponse(200, updatedOrder, "Order status updated successfully." ));
    }
  } catch (error) {
    console.log("Error updating user:", error.message);
    throw new ApiError(500, error.message || "Error updating user");
  }
});

// Delete an order
const deleteOrder = asynchandler(async (req, res) => {
  const orderId = req.params.id;

  const deletedOrder = await Order.findByIdAndDelete(orderId);
  if (!deletedOrder) {
    throw new ApiError(404, "Order not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedOrder, "Order deleted successfully."));
});

export { createOrder, getOrderById, updateOrder, deleteOrder,getAllOrder };
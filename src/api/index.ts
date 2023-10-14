// User
import { signin } from "api/auth/auth";

// Products
import { getAllProductsByLimit, getProduct } from "api/product/product";

// Category
import { getAllCategory } from "api/category/category";

// Cart
import { getCartProducts } from "api/cart/cart";

// Order
import { createOrder } from "api/order/order";

// Admin
import {
  getAllProducts,
  createProduct,
  deleteProduct,
} from "api/admin/products";
import { createCategory } from "api/admin/category";

export {
  // User
  signin,
  // Products
  getAllProductsByLimit,
  getProduct,
  // Category
  getAllCategory,
  // Cart
  getCartProducts,
  // Order
  createOrder,
  // Admin
  getAllProducts,
  createProduct,
  deleteProduct,
  createCategory,
};

import { configureStore } from "@reduxjs/toolkit";

// Slice
import userReducer from "redux/userSlice";
import cartReducer from "redux/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;

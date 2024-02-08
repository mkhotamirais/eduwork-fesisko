import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsSlice";
import categoriesReducer from "../features/categoriesSlice";
import cartsReducer from "../features/cartsSlice";
import orderReducer from "../features/orderSlice";

export const Store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    carts: cartsReducer,
    order: orderReducer,
  },
});

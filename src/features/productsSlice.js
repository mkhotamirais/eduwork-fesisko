import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../constants/contants";

export const getProducts = createAsyncThunk("products/getProducts", async ({ key, cat, sort }) => {
  try {
    const response = await axios.get(
      `${url}product?${sort ? "&sorting=" + sort : ""}${cat ? "&categories=" + cat : ""}${key ? "&search_name=" + key : ""}`
    );
    return response.data.aaData;
  } catch (error) {
    return error;
  }
});

export const getDetailProduct = createAsyncThunk("products/getDetailProduct", async (id) => {
  try {
    const response = await axios.get(`${url}single/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    key: "",
    sort: "",
  },
  reducers: {
    inputKey: (state, action) => {
      state.key = action.payload;
    },
    chooseSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getDetailProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDetailProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      });
  },
});

export const getAllProducts = (state) => state.products.products;
export const getSingleProduct = (state) => state.products.products;

export const getStatus = (state) => state.products.status;
export const { inputKey, chooseSort } = productsSlice.actions;
export const getKey = (state) => state.products.key;
export const getSort = (state) => state.products.sort;

export default productsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { catUrl } from "../constants/contants";
import axios from "axios";

export const getCategories = createAsyncThunk("categories/getCategories", async () => {
  try {
    const response = await axios.get(catUrl);
    return response.data.aaData;
  } catch (error) {
    return error;
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    cat: "",
  },
  reducers: {
    chooseCategory: (state, action) => {
      state.cat = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { chooseCategory } = categoriesSlice.actions;
export const getAllCategories = (state) => state.categories.categories;
export const getCat = (state) => state.categories.cat;

export default categoriesSlice.reducer;

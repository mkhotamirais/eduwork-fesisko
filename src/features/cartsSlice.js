import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { cityUrl, districtUrl, ongkirUrl, provinceUrl } from "../constants/contants";

export const fetchProvince = createAsyncThunk("province/fetchProvince", async () => (await axios.get(provinceUrl)).data);
export const fetchProvince2 = createAsyncThunk("province/fetchProvince2", async () => (await axios.get(provinceUrl)).data);

export const fetchCity = createAsyncThunk(
  "city/fetchCity",
  async (provId) => (await axios.get(`${cityUrl}/${provId}`)).data
);
export const fetchCity2 = createAsyncThunk(
  "city/fetchCity2",
  async (provId) => (await axios.get(`${cityUrl}/${provId}`)).data
);

export const fetchDistrict = createAsyncThunk(
  "district/fetchDistrict",
  async (cityId) => (await axios.get(`${districtUrl}?id=${cityId}`)).data
);
export const fetchDistrict2 = createAsyncThunk(
  "district/fetchDistrict2",
  async (cityId) => (await axios.get(`${districtUrl}?id=${cityId}`)).data
);

export const fetchOngkir = createAsyncThunk("ongkir/fetchOngkir", async ({ id, destination, weight }) => {
  // const response = await axios.get("https://demo.sistemtoko.com/ongkir?id=440&destination=6987&weight=200");
  const response = await axios.get(`${ongkirUrl}?id=${id}&destination=${destination}&weight=${weight}`);
  return response.data.data[0].costs;
});

const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    carts: JSON.parse(localStorage.getItem("carts")) || [],
    num: JSON.parse(localStorage.getItem("num")) || 0,
    province: [],
    province2: [],
    city: [],
    city2: [],
    district: [],
    district2: [],
    isCartsFromFilled: false,
    totalWeight: 0,
    ongkir: [],
    order: [],
    statusOrder: "idle",
    errorOrder: null,
    isBounceNum: false,
  },
  reducers: {
    onCartsFromFilled(state, action) {
      state.isCartsFromFilled = action.payload;
    },
    removeBounceNum(state) {
      state.isBounceNum = false;
    },
    addToCart(state, action) {
      state.isBounceNum = true;
      const { id } = action.payload;
      if (state.carts.find((cart) => cart.id === id)) {
        state.carts = state.carts.map((cart) => (cart.id === id ? { ...cart, qty: cart.qty + 1 } : cart));
      } else state.carts = [...state.carts, { id, qty: 1 }];
      state.num = state.carts.reduce((a, b) => a + b.qty, 0);
      localStorage.setItem("num", JSON.stringify(state.num));
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      state.carts = state.carts.map((cart) => (cart.id === id ? { ...cart, qty: cart.qty - 1 } : cart));
      if (state.carts.find((cart) => cart.qty === 0)) {
        state.carts = state.carts.filter((cart) => cart.id !== id);
      }
      state.num = state.carts.reduce((a, b) => a + b.qty, 0);
      localStorage.setItem("num", JSON.stringify(state.num));
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    gainWeight(state, action) {
      state.totalWeight = action.payload;
    },
    gainOrder(state, action) {
      state.order = action.payload;
    },
    emptyCart() {
      localStorage.removeItem("carts");
      localStorage.removeItem("num");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProvince.fulfilled, (state, action) => {
        state.province = action.payload;
      })
      .addCase(fetchProvince2.fulfilled, (state, action) => {
        state.province2 = action.payload;
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        state.city = action.payload;
      })
      .addCase(fetchCity2.fulfilled, (state, action) => {
        state.city2 = action.payload;
      })
      .addCase(fetchDistrict.fulfilled, (state, action) => {
        state.district = action.payload;
      })
      .addCase(fetchDistrict2.fulfilled, (state, action) => {
        state.district2 = action.payload;
      })
      .addCase(fetchOngkir.pending, (state) => {
        state.statusOrder = "loading";
      })
      .addCase(fetchOngkir.fulfilled, (state, action) => {
        console.log(action.payload);
        state.statusOrder = "succeeded";
        state.ongkir = action.payload;
      })
      .addCase(fetchOngkir.rejected, (state) => {
        state.statusOrder = "failed";
        state.errorOrder = "Pelayanan belum tersedia";
      });
  },
});

export const { addToCart, removeFromCart, gainWeight, gainOrder, emptyCart, onCartsFromFilled, removeBounceNum } =
  cartsSlice.actions;

export const getCarts = (state) => state.carts.carts;
export const getNum = (state) => state.carts.num;
export const getWeight = (state) => state.carts.totalWeight;
export const getOngkir = (state) => state.carts.ongkir;
export const getOrder = (state) => state.carts.order;

export const getProvince = (state) => state.carts.province;
export const getProvince2 = (state) => state.carts.province2;
export const getCity = (state) => state.carts.city;
export const getCity2 = (state) => state.carts.city2;
export const getDistrict = (state) => state.carts.district;
export const getDistrict2 = (state) => state.carts.district2;

export const getIsCartsFromFilled = (state) => state.carts.isCartsFromFilled;

export const getStatusOrder = (state) => state.carts.statusOrder;
export const getErrorOrder = (state) => state.carts.errorOrder;

export const getIsBounceNum = (state) => state.carts.isBounceNum;

export default cartsSlice.reducer;

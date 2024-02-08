import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { invoiceUrl, orderUrl } from "../constants/contants";

export const submitOrder = createAsyncThunk("order/submitOrder", async (data) => {
  const response = await axios.post(
    orderUrl,
    { order_json: data },
    // {
    //   order_json: [
    //     {
    //       product_id: 25136,
    //       product_name: "tas 3 varian 1",
    //       product_img: "https://demo.sistemtoko.com/img/user/demo/product/jakc1i-ovhycn-1-png-png.png",
    //       product_price: "50.000",
    //       product_qty: 1,
    //       product_weight: 100,
    //       product_stock: 96,
    //     },
    //     {
    //       product_id: 25133,
    //       product_name: "tas 1",
    //       product_img: "https://demo.sistemtoko.com/img/user/demo/product/kdkxol-mxnjcy-23-png-png.png",
    //       product_price: "100.000",
    //       product_qty: 1,
    //       product_weight: 100,
    //       product_stock: 83,
    //     },
    //   ],
    // },
    {
      Headers: {
        "X-Requested-With": XMLHttpRequest,
      },
    }
  );
  return response.data;
});

export const fetchInvoice = createAsyncThunk("invoice/fetchInvoice", async () => {
  const response = await axios.get(invoiceUrl);
  return response.data.sale;
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    invoice: "",
  },
  extraReducers(builder) {
    builder
      .addCase(submitOrder.fulfilled, () => {
        // console.log(action.payload);
      })
      .addCase(fetchInvoice.fulfilled, (state, action) => {
        state.invoice = action.payload;
      });
  },
});

export const getInvoice = (state) => state.order.invoice;

export default orderSlice.reducer;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import { Provider } from "react-redux";
import { Store } from "./app/Store.js";
import ProductsList from "./pages/products/ProductsList.jsx";
import SingleProduct from "./pages/products/SingleProduct.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Ongkir from "./pages/cart/Ongkir.jsx";
import Invoice from "./pages/cart/Invoice.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products">
          <Route index element={<ProductsList />} />
          <Route path="product/:id" element={<SingleProduct />} />
        </Route>
        <Route path="carts">
          <Route index element={<Cart />} />
          <Route path="ongkir" element={<Ongkir />} />
          <Route path="invoice" element={<Invoice />} />
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

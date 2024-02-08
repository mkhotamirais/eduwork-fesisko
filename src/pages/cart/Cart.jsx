import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, gainOrder, gainWeight, getCarts, removeFromCart } from "../../features/cartsSlice";
import { getAllProducts, getKey, getProducts, getSort } from "../../features/productsSlice";
import { getCat } from "../../features/categoriesSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const carts = useSelector(getCarts);
  const products = useSelector(getAllProducts);

  const dispatch = useDispatch();
  const key = useSelector(getKey);
  const cat = useSelector(getCat);
  const sort = useSelector(getSort);
  const [totalPrice, setTotalPrice] = useState(0);
  const totalPriceRef = useRef(null);
  const [weight, setWeight] = useState(0);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    dispatch(getProducts({ key, cat, sort }));
  }, [dispatch, key, cat, sort]);

  useEffect(() => {
    if (carts.length > 0 && products.length > 0) {
      const sum = carts.reduce((acc, cart) => {
        const product = products.find((product) => product.id === cart.id);
        return acc + product.price.replace(".", "") * cart.qty;
      }, 0);
      setTotalPrice(sum);
    }
  }, [carts, products]);

  useEffect(() => {
    if (carts.length > 0 && products.length > 0) {
      const sumWeight = carts.reduce((acc, cart) => {
        const product = products.find((product) => product.id === cart.id);
        return acc + product.weight * cart.qty;
      }, 0);
      setWeight(sumWeight);
    }
  }, [carts, products]);

  useEffect(() => {
    if (weight) {
      dispatch(gainWeight(weight));
    }
  }, [dispatch, weight]);

  useEffect(() => {
    if (carts.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else totalPriceRef.current.style.display = "none";
  }, [carts]);

  useEffect(() => {
    const result = [];
    if (carts.length > 0 && products.length > 0) {
      carts.map((cart) => {
        const product = products.find((product) => product.id === cart.id);
        result.push({
          product_id: product.id,
          product_name: product.name,
          product_image: product.photo,
          product_price: product.price,
          product_qty: cart.qty,
          product_weight: product.weight,
          product_stock: product.stock,
        });
      });
    }
    setOrder(result);
  }, [carts, products]);

  useEffect(() => {
    if (order) {
      dispatch(gainOrder(order));
    }
  }, [dispatch, order]);

  return (
    <section id="cart" className="rounded py-3">
      <div className="p-3 bg-white">
        <table className="w-full rounded">
          <thead className="text-left">
            <tr className="border-b-2 border-slate-400">
              <th className="text-center">Image</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              carts.map((cart, i) => {
                const product = products.find((product) => product.id === cart.id);
                return (
                  <tr key={i} className="border-b">
                    <td>
                      <img
                        src={product.photo}
                        alt={product.name}
                        className="w-full sm:w-1/2 h-28 mx-auto object-cover rounded"
                      />
                    </td>
                    <td className="capitalize font-medium">{product.name}</td>
                    <td className="flex flex-col sm:flex-row h-32 items-center justify-center">
                      <button
                        onClick={() => dispatch(removeFromCart({ id: product.id }))}
                        className="border p-1 leading-none rounded-full order-3 sm:order-1"
                      >
                        -
                      </button>
                      <span className="mx-2 order-2">{cart.qty}</span>
                      <button
                        onClick={() => dispatch(addToCart({ id: product.id }))}
                        className="border p-1 leading-none rounded-full order-1 sm:order-3"
                      >
                        +
                      </button>
                    </td>
                    <td>Rp{(cart.qty * product.price.replace(".", "")).toLocaleString("id-ID")}</td>
                  </tr>
                );
              })}
            <tr ref={totalPriceRef} className="border-t-2 border-slate-400">
              <th colSpan={3} className="capitalize">
                total price
              </th>
              <td className="font-semibold">Rp{totalPrice.toLocaleString("id-ID")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {carts.length > 0 && (
        <Link to="ongkir">
          <button className="bg-blue-500 p-2 text-white rounded my-2 w-full sm:w-auto sm:float-end hover:opacity-70">
            Checkout
          </button>
        </Link>
      )}
    </section>
  );
};

export default Cart;

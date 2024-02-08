import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoice, getInvoice } from "../../features/orderSlice";
import { emptyCart, getWeight } from "../../features/cartsSlice";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const invoice = useSelector(getInvoice);
  const dispatch = useDispatch();
  const weight = useSelector(getWeight);

  const navigate = useNavigate();

  useEffect(() => {
    if (weight == 0) {
      navigate("/carts");
    }
  }, [weight, navigate]);

  useEffect(() => {
    dispatch(fetchInvoice());
    dispatch(emptyCart());
  }, [dispatch]);

  return (
    <section className="py-3">
      <div className="p-3 bg-white rounded">
        {invoice && (
          <table className="w-full">
            <tbody className="text-left">
              <tr>
                <th>Id</th>
                <td>{invoice.sale_id}</td>
              </tr>
              <tr>
                <th>Customer/Phone</th>
                <th>
                  {invoice.customer.name} - {invoice.customer.phone}
                </th>
              </tr>
              <tr>
                <th>Customer Address</th>
                <td>{invoice.customer.address}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>Rp{invoice.sale_price.toLocaleString("id-ID")}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>{invoice.sale_date}</td>
              </tr>
              <tr>
                <th>Product Name</th>
                <td>{invoice.items[0].name}</td>
              </tr>
              <tr>
                <th>Product Weight</th>
                <td>{invoice.items[0].weight}gr</td>
              </tr>
              <tr>
                <th>Product Price</th>
                <td>Rp{invoice.items[0].buyPrice.toLocaleString("id-ID")}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{invoice.sale_payment_status}</td>
              </tr>
              <tr>
                <th>Notes</th>
                <td>{invoice.sale_keterangan}</td>
              </tr>
            </tbody>
          </table>
        )}
        <a href="/">
          <button className="border p-2 bg-slate-500 text-white rounded my-3 hover:opacity-70">Back To Home</button>
        </a>
      </div>
    </section>
  );
};

export default Invoice;

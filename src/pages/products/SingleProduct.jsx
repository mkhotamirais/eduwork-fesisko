import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProducts, getDetailProduct, getStatus } from "../../features/productsSlice";
import { imgUrl } from "../../constants/contants";
import { Prev, Spinner } from "../../components/Tags";
import { FaCartPlus } from "react-icons/fa";
import { addToCart } from "../../features/cartsSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const status = useSelector(getStatus);

  const product = useSelector(getAllProducts);

  useEffect(() => {
    dispatch(getDetailProduct(id));
  }, [dispatch, id]);

  let content = "";
  if (status === "loading") {
    content = <Spinner />;
  } else if (status === "succeeded") {
    content = (
      <>
        <Prev />
        <section className="grid grid-cols-2 gap-3 pb-5">
          <figure className="h-[calc(100vh-10rem)]">
            <img
              src={imgUrl + product.product_img}
              alt={product.product_name}
              className="rounded-lg h-full w-full object-cover"
            />
          </figure>
          <div className="p-5 bg-white rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody className="text-left leading-loose">
                <tr className="border-b">
                  <th>Name</th>
                  <td className="capitalize">{product && product.product_name}</td>
                </tr>
                <tr className="border-b">
                  <th>Price</th>
                  <td>Rp{parseInt(product.product_price).toLocaleString("id-ID")}</td>
                </tr>
                <tr className="border-b">
                  <th>Stock</th>
                  <td>{product.product_qty_stock}</td>
                </tr>
                <tr className="border-b">
                  <th>Weight</th>
                  <td>{product.product_weight}</td>
                </tr>
                <tr className="border-b">
                  <th>Status</th>
                  <td>{product.product_status}</td>
                </tr>
                <tr>
                  <th></th>
                  <td className="text-end">
                    <button className="border p-3 mt-3 rounded" onClick={() => dispatch(addToCart({ id: parseInt(id) }))}>
                      <FaCartPlus className="text-xl" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }

  return content;
};

export default SingleProduct;

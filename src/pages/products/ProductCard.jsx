import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cartsSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const onAddToCart = (id) => {
    dispatch(addToCart({ id }));
  };
  return (
    <div className="bg-white border rounded p-3">
      <Link to={product.photo}>
        <figure className="overflow-hidden">
          <img src={product.photo} alt={product.name} className="hover:scale-110 transition-all duration-300" />
        </figure>
      </Link>
      <Link to={`product/${product.id}`}>
        <h3 className="capitalize text-xl font-semibold leading-relaxed text-blue-500 hover:underline">{product.name}</h3>
      </Link>
      <div className="text-2xl text-slate-600 font-semibold flex justify-between items-center">
        <div className="text-lg md:text-2xl">
          {product.currency}
          {product.price}
        </div>
        <button onClick={() => onAddToCart(product.id)} className="hover:text-blue-500">
          <FaCartPlus />
        </button>
      </div>
    </div>
  );
};
ProductCard.propTypes;

export default ProductCard;

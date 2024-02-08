import { NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getIsBounceNum, getNum, removeBounceNum } from "../features/cartsSlice";
import { useEffect } from "react";

const Carts = () => {
  const num = useSelector(getNum);
  const isBounceNum = useSelector(getIsBounceNum);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(removeBounceNum());
    }, 1500);
  }, [dispatch, isBounceNum]);
  return (
    <NavLink to="carts" className="relative hover:opacity-70">
      <FaCartShopping className="text-xl" />
      <span
        className={`bg-rose-500 text-xs rounded-full text-white p-[0.2rem] absolute -top-3 -right-2 leading-none ${
          isBounceNum && "animate-bounce"
        }`}
      >
        {num}
      </span>
    </NavLink>
  );
};

export default Carts;

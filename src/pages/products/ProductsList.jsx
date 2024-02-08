import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getKey, getProducts, getSort, getStatus } from "../../features/productsSlice";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { Spinner } from "../../components/Tags";
import CategoriesOption from "./CategoriesOption";
import { getCat } from "../../features/categoriesSlice";
import SortOption from "./SortOption";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(getAllProducts);
  const status = useSelector(getStatus);
  const key = useSelector(getKey);
  const cat = useSelector(getCat);
  const sort = useSelector(getSort);

  useEffect(() => {
    dispatch(getProducts({ key, cat, sort }));
    navigate("/products");
  }, [dispatch, key, cat, sort, navigate]);

  let content = "";
  if (status === "loading") {
    content = <Spinner />;
  } else if (status === "succeeded") {
    content = (
      <section className="py-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {products.length > 0 ? products.map((product) => <ProductCard key={product.id} product={product} />) : null}
      </section>
    );
  }
  return (
    <>
      <div className="">
        <SortOption />
        <CategoriesOption />
      </div>
      {content}
    </>
  );
};

export default ProductsList;

import { useDispatch, useSelector } from "react-redux";
import { chooseCategory, getAllCategories, getCategories } from "../../features/categoriesSlice";
import { useEffect, useState } from "react";

const CategoriesOption = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const [cat, setCat] = useState("");

  useEffect(() => {
    dispatch(chooseCategory(cat));
    dispatch(getCategories());
  }, [dispatch, cat]);

  return (
    <select
      name="categories"
      id="categories"
      value={cat}
      onChange={(e) => setCat(e.target.value)}
      className="border p-2 rounded mt-2 ms-auto focus:outline-none"
    >
      <option value="">--Select Category--</option>
      {categories.map((category) => (
        <option key={category.product_category_id} value={category.product_category_id}>
          {category.product_category_name}
        </option>
      ))}
    </select>
  );
};

export default CategoriesOption;

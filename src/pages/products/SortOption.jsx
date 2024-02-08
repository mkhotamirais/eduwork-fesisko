import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { chooseSort } from "../../features/productsSlice";

const SortOption = () => {
  const [sort, setSort] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chooseSort(sort));
  }, [dispatch, sort]);
  return (
    <select
      name="sort"
      id="sort"
      onChange={(e) => setSort(e.target.value)}
      className="p-2 border focus:outline-none rounded mr-2"
    >
      <option value="">--Sort--</option>
      <option value="Lates">Latest</option>
      <option value="cheapest">Cheapest</option>
      <option value="expensive">Expensive</option>
    </select>
  );
};

export default SortOption;

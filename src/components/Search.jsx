import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inputKey } from "../features/productsSlice";

const Search = () => {
  const [key, setKey] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    dispatch(inputKey(key));
    setKey("");
  };

  return (
    <section className="border flex items-center rounded h-10 overflow-hidden w-2/3 sm:w-1/2 ">
      <form onSubmit={onSearch} className="flex items-center w-full">
        <input
          type="search"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onFocus={() => navigate("/products")}
          placeholder="Search here..."
          className="border-b p-2 h-12 w-full focus:outline-none focus:border-b bg-inherit"
        />
        <button type="submit" className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white hover:opacity-70">
          <FaSearch />
        </button>
      </form>
    </section>
  );
};

export default Search;

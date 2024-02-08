import { FaChevronCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Gallery from "./homePage/Gallery";
import Blog from "./homePage/Blog";

const Home = () => {
  return (
    <>
      <section className="flex flex-col items-start sm:items-center justify-center min-h-[calc(100vh-8rem)]">
        <h1 className="text-5xl sm:text-6xl text-transparent bg-clip-text font-semibold bg-gradient-to-br from-blue-600 via-green-600 to-red-600 leading-relaxed">
          Welcome to FE-SISKO
        </h1>
        <Link
          to="/products"
          className="flex gap-2 hover:gap-4 transition-all duration-300 mt-7 items-center text-blue-500 text-xl"
        >
          <span>Go to Products</span>
          <FaChevronCircleRight />
        </Link>
      </section>
      <Gallery />
      <Blog />
    </>
  );
};

export default Home;

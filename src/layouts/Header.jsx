import { NavLink } from "react-router-dom";
import Search from "../components/Search";
import Carts from "../components/Carts";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";

const Header = () => {
  const [showLogo, setShowLogo] = useState(true);
  const changeLogo = () => {
    window.innerWidth < 640 ? setShowLogo(false) : setShowLogo(true);
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      changeLogo();
    });
  });
  return (
    <header className="h-16 flex items-center justify-between px-3 lg:px-16 sticky top-0 backdrop-blur-[5px] backdrop-saturate-[1.8] bg-[rgba(255,255,255,.8)] border-b">
      <NavLink to="/" className={"text-xl font-semibold"}>
        {showLogo ? <span>FE-SISKO</span> : <FaHome />}
      </NavLink>
      <Search />
      <Carts />
    </header>
  );
};

export default Header;

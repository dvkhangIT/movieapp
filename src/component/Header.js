import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigation";

const Header = () => {
  const location = useLocation();
  const key = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setsearchInput] = useState(key);
  const navigate = useNavigate();
  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [navigate, searchInput]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <header className="fixed top-0 z-40 w-full h-16 bg-black bg-opacity-75">
      <div className="container flex items-center h-full px-3 mx-auto">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>
        <nav className="items-center hidden gap-1 ml-5 lg:flex">
          {navigation.map((nav, item) => (
            <div key={nav.label} className="capitalize">
              <NavLink
                className={({ isActive }) =>
                  `px-2 hover:text-neutral-100 ${
                    isActive && "text-neutral-100"
                  }`
                }
                to={nav.href}
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-5 ml-auto">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              className="hidden px-4 py-1 bg-transparent border-0 outline-none lg:block"
              type="text"
              placeholder="Search here..."
              value={searchInput}
              onChange={(e) => setsearchInput(e.target.value)}
            />
          </form>
          <div className="text-2xl text-white">
            <IoSearchOutline />
          </div>
          <div className="w-8 h-8 overflow-hidden transition-all rounded-full cursor-pointer active:scale-50">
            <img src={userIcon} alt="" className="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

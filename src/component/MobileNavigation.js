import React from "react";
import { NavLink } from "react-router-dom";
import { mobileNavigation } from "../contants/navigation";

const MobileNavigation = () => {
  return (
    <section className="fixed bottom-0 z-20 w-full bg-black bg-opacity-75 h-14 lg:hidden">
      <div className="flex items-center justify-between h-full text-neutral-400">
        {mobileNavigation.map((nav, index) => (
          <NavLink
            to={nav.href}
            key={nav.label}
            className={({ isActive }) =>
              `px-3 h-full items-center justify-center flex-col flex transition-all ${
                isActive && "text-white"
              }`
            }
          >
            <div className="text-2xl">{nav.icon}</div>
            <p className="text-sm capitalize">{nav.label}</p>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default MobileNavigation;

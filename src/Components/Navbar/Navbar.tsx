import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="quran">القرآن الكريم</NavLink>
    </div>
  );
};

export default Navbar;

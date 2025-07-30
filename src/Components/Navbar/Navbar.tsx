import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="quran">القرآن الكريم</NavLink>
      <NavLink to="azkars">الاذكار</NavLink>
      <NavLink to="hadiths">أحاديث</NavLink>
    </div>
  );
};

export default Navbar;

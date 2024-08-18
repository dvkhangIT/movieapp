import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-2 text-center bg-neutral-600 text-neutral-100">
      <div className="flex justify-center gap-4">
        <Link to="/about">About</Link>
        <Link to="contact">Contact</Link>
      </div>
      <p className="capitalize">create by me</p>
    </footer>
  );
};

export default Footer;

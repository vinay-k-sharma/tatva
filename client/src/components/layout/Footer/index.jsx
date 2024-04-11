import React from 'react';
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="sticky top-full mt-20 bg-[#D88552] px-4 pt-20">
      <nav aria-label="Footer Navigation" className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left">
      <Link to="/login" className="font-medium text-white">Login</Link>
        <Link to="/register" className="font-medium text-white">Register</Link>
        <Link to="/" className="font-medium text-white">Home</Link>
        <Link to="#" className="font-medium text-white">Terms & Conditions</Link>
      </nav>
      <p className="py-10 text-center text-gray-300">© 2024 Tatva | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
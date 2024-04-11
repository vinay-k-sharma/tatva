import React from 'react';
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#D88552] shadow py-5 sticky top-full mt-5">
      <div className="w-full mx-auto p-4 md:py-3">
        <nav aria-label="Footer Navigation" className="text-center">
          <ul className="w-[min(90%,200px)] sm:w-3/4 md:w-[550px] mx-auto grid grid-cols-2 sm:grid-cols-4 place-items-center mb-4 text-xs sm:text-sm md:text-base font-medium text-white sm:mb-0 ">
            <li className="justify-self-center sm:justify-self-auto">
              <Link to="/login" className="hover:text-black font-bold transition-all flex items-center gap-1 mr-4">Login</Link>
            </li>
            <li className="justify-self-start sm:justify-self-auto">
              <Link to="/register" className="hover:text-black font-bold transition-all flex items-center gap-1 mr-4">Register</Link>
            </li>
            <li className="justify-self-center sm:justify-self-auto">
              <Link to="/" className="hover:text-black font-bold transition-all flex items-center gap-1 mr-4">Home</Link>
            </li>
            <li className="justify-self-start sm:justify-self-auto">
              <Link to="#" className="hover:text-black font-bold transition-all flex items-center gap-1 mr-4">Terms & Conditions</Link>
            </li>
          </ul>
        </nav>
        <p className="w-full mx-auto text-sm text-gray-300 text-center mt-4 pt-2">© 2024 Tatva | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

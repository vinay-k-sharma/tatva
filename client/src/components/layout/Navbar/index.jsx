import { NavLink, useNavigate } from "react-router-dom";
import logo from "/images/png/tatva3.png";
import { useDispatch, useSelector } from "react-redux";
import { removeRole } from "../../../redux/actions/roleAction";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Links from "./Links/Links";
import { HiOutlineLogin } from "react-icons/hi";
import {
  generalLinks,
  adminLinks,
  userLinks,
  sellerLinks
} from "./Links/LinkData";

const Navbar = () => {
  const { isAuth, user,seller, admin } = useSelector((state) => state.role);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navRef = useRef(null);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(removeRole());
    toast.success("Logout Successful !!");
    show === true ? setShow(!show) : null;
    scrollToTop();
    navigate("/");
  };
  const toggleNavbar = () => {
    scrollToTop();
    show === true ? setShow(!show) : null;
  };

  const navCloseHandler = (e) => {
    if (!navRef?.current.contains(e.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", navCloseHandler);
  });
  return (
    <nav className="bg-[#D88552] sticky top-0 left-0 " style={{zIndex: 1001}}>
      <div className="flex flex-wrap items-center justify-between mx-auto py-4 px-4 md:px-6"
       ref={navRef}
      >
        <NavLink
          to={
            admin ? "/admin" : seller ? "/seller-dashboard" : "/"
          }
          className='flex items-center'
        >
          <div className="w-[65px] md:w-[60px]">
            <img src={logo} alt="logo" className="w-full" />
          </div>
        </NavLink>
        <button
          onClick={() => setShow(!show)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-sm md:hidden m-[0px!important] p-[0px!important] hover:bg-[rgba(0,0,0,0)!important] hover:text-black"
          
        >
          {show ? (
            <IoClose className="h-full w-full" />
          ) : (
            <IoMenu className="h-full w-full" />
          )}
        </button>
        <div  className={`${show ? "" : "hidden"} w-full md:block md:w-auto`}>
          <Links
            linksToRender={
              user
                ? userLinks
                : seller
                ? sellerLinks
                : admin
                ? adminLinks
                : generalLinks
            }
            toggleNavbar={toggleNavbar}
          >
            <li className="md:ml-2 text-white">
              {isAuth ? (
                <NavLink
                  onClick={(e) => handleLogOut(e)}
                  className='text-white flex items-center gap-1 text-[1rem] p-2 rounded transition-all duration-200 ease-in-out hover:text-black'
                >
                  <IoIosLogOut className="text-2xl"/> Logout
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className='text-white flex items-center gap-1 text-[1rem] p-2 rounded transition-all duration-200 ease-in-out hover:text-black'
                  onClick={() => toggleNavbar()}
                >
                  <HiOutlineLogin className="text-2xl"/> Login
                </NavLink>
              )}
            </li>
          </Links>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

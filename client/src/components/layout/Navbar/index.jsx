import { NavLink, useNavigate } from "react-router-dom";
import logo from "/images/png/tatva3.png";
import { useDispatch, useSelector } from "react-redux";
import { removeRole } from "../../../redux/actions/roleAction";

import Links from "./Links/Links";

import {
  generalLinks,
  adminLinks,
  userLinks,
} from "./Links/LinkData";

const Navbar = () => {
  const { isAuth, user, admin } = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(removeRole());
    navigate("/");
  };

  return (
    <nav className="bg-[#D88552] sticky top-0 left-0 z-50 ">
      <div className="flex flex-wrap items-center justify-between mx-auto py-4 px-4 md:px-6">
        <NavLink
          to={
            admin ? "/admin" : "/"
          }
          className='flex items-center'
        >
          <div className="w-[65px] md:w-[60px]">
            <img src={logo} alt="logo" className="w-full" />
          </div>
        </NavLink>
        <div >
          <Links
            linksToRender={
              user
                ? userLinks
                : admin
                ? adminLinks
                : generalLinks
            }
          >
            <li className="md:ml-2 text-white">
              {isAuth ? (
                <NavLink
                  onClick={(e) => handleLogOut(e)}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                >
                  Login
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

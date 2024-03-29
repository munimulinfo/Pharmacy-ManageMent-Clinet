import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useEffect, useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { CgUserlane } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ActiveLink from "./ActiveLink/ActiveLink";
import Avatar from "./Avatar/Avatar";
import Lang from "./Language/Lang";
import Logo from "./Logo/Logo";
import NavCart from "./NavCard/NavCart";
import ResponsiveNavbar from "./ResponsiveNavbar/ResponsiveNavbar";
import Search from "./Search/Search";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const menuItems = (
    <>
      <li>
        <ActiveLink to="/">Home</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/medicines">Medicines</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/lab-test">Lab Test</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/healthtips">Health Tips </ActiveLink>
      </li>
      <li>
        <ActiveLink to="/services">Services</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/blogs">Blogs</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/about-us">About Us</ActiveLink>
      </li>
      <li>
        <ActiveLink to="/contract">Contacts</ActiveLink>
      </li>
    </>
  );
  const handelLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  };

  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        // Scrolling down, hide the navbar
        setVisible(false);
      } else {
        // Scrolling up, show the navbar
        setVisible(true);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <div className="mb-[122px]">
      <div
        className={`${visible ? "block" : "hidden"} z-20 fixed top-0 left-0 w-full bg-white transition-all duration-700 ease-in-out`}
      >
        <div className="nav-container">
          <div className="hidden xl:block">
            <div className="flex items-center justify-between py-2 ">
              <div className="flex items-center gap-10 justify-between">
                <Logo />
                <Search />
              </div>
              <div className="flex items-center gap-4 lg:gap-10">
                <Lang />
                <NavCart />
                <div>
                  <Menu
                    menuButton={
                      <MenuButton>
                        <Avatar />
                      </MenuButton>
                    }
                    transition
                  >
                    {user ? (
                      <div className="flex flex-col gap-2 divide-y-2 divide-gray-3">
                        <NavLink
                          to="/dashboard"
                          type="submit"
                          className="font-semibold text-neutral-600"
                        >
                          <MenuItem className="gap-4 items-center">
                            <MdOutlineDashboardCustomize className="text-xl 2xl:text-3xl" />
                            Dashboard
                          </MenuItem>
                        </NavLink>
                        <button
                          type="submit"
                          className="font-semibold text-neutral-600"
                          onClick={handelLogOut}
                        >
                          <MenuItem className="gap-4 items-center">
                            <HiOutlineLogout className="text-xl 2xl:text-3xl" />{" "}
                            Log Out
                          </MenuItem>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 divide-y-2 divide-gray-3">
                        <Link
                          className=" font-semibold text-neutral-600"
                          to="/login"
                        >
                          <MenuItem className="gap-4 items-center">
                            <BiLogInCircle className="text-xl 2xl:text-3xl" />
                            Login
                          </MenuItem>
                        </Link>
                        <Link
                          className=" font-semibold text-neutral-600"
                          to="/signUp"
                        >
                          <MenuItem className="gap-4 items-center">
                            <CgUserlane className="text-xl 2xl:text-3xl" />
                            Sign Up
                          </MenuItem>
                        </Link>
                      </div>
                    )}
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-3" />
        <div className="hidden xl:block ">
          <div className="nav-container ">
            <div className="py-2">
              <ul className="flex items-center justify-between text-md font-semibold text-gray-5 hover:text-gray-6 py-1 2xl:py-2">
                {menuItems}
              </ul>
            </div>
          </div>
          <hr className=" border-1 border-gray-3 drop-shadow-xl" />
        </div>
        <div className=" xl:hidden">
          <ResponsiveNavbar menuItems={menuItems} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

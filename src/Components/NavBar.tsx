import { MdElectricBolt } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { Link, NavLink } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRef, useState } from "react";
import { auth } from "../config/firebase";
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { logOut } from "../utils/auth";
import { BiLogOut } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  return (
    <nav
      className="flex justify-between items-center space-x-2 font-bold sticky top-0 left-0 z-50 w-full md:px-25 px-10 py-4 backdrop-blur-md  text-gray-200 shadow-lg bg-transparent bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80"
      id="navbar"
    >
      <Link to="/" className="flex items-center space-x-2">
        <MdElectricBolt className=" text-3xl bg-gradient-to-tr  from-indigo-500 via-purple-500 to-pink-500 rounded-md p-1 " />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-gray-400 to-purple-500  text-xl">
          AI Chat
        </span>
      </Link>
      <div className="flex justify-between items-center space-x-4 max-sm:hidden text-sm relative">
        <NavLink
          to="/"
          className="button-navbar flex gap-2 items-center hover:bg-white hover:text-blue-500"
        >
          Home
        </NavLink>
        {user ? (
          <>
            <NavLink to="/chat" className="button-navbar">
              Chat
            </NavLink>
            <div
              className="dropdown dropdown-end "
              tabIndex={0}
              ref={buttonsRef}
            >
              <button
                className="flex justify-center items-center gap-1 button-navbar"
                onClick={() => setDropDownMenu(!dropDownMenu)}
                role="button"
              >
                {
                  <img
                    src={
                      user?.photoURL ||
                      `https://ui-avatars.com/api/name=${user.email}&background=random`
                    }
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                }
                {user.email}{" "}
                {dropDownMenu ? (
                  <MdOutlineKeyboardArrowUp size={25} />
                ) : (
                  <MdKeyboardArrowDown size={25} />
                )}
              </button>
              {dropDownMenu && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <button className="text-white">{user.email}</button>
                  </li>
                  <li>
                    <button
                      className="flex items-center gap-1 text-red-500 "
                      onClick={logOut}
                    >
                      <BiLogOut />
                      Logout{" "}
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : (
          <NavLink to="/auth" className="button-navbar">
            Login
          </NavLink>
        )}
      </div>
      <div className="dropdown dropdown-end hidden max-sm:block " tabIndex={0}>
        <div
          role="button"
          className="btn m-1 bg-transparent  p-2 outline-none border-none shadow-none transition-all transform hover:scale-110 hover:bg-gray-800"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <IoMdMenu size={30} />
        </div>
        {menu && (
          <>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              onClick={() => setMenu(!menu)}
            >
              <li>
                <Link to="/">Home</Link>
              </li>

              {user ? (
                <>
                  <li>
                    <Link to="/chat">Chat</Link>
                  </li>
                  <li>
                    <p className="text-white font-semibold">{user?.email}</p>
                  </li>
                  <li>
                    <button
                      className="text-red-500 font-semibold"
                      onClick={logOut}
                    >
                      <FiLogOut /> LogOut
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/auth">SignIn</Link>
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

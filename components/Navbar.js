import { AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <nav className="z-30 sticky top-0 bg-white py-5 px-3 shadow-md flex items-center justify-between">
        {/*left section - Brand Div */}
        <div className="flex">
          <Link href="/">
            <span className="text-2xl text-gray-700 font-semibold border-[3px] p-[2px] border-gray-700">
              mV
            </span>
          </Link>
        </div>
        {/* mid section - search section */}
        <div className="flex items-center md:w-[400px] border-2 rounded-full justify-center border-gray-300 md:shadow-sm">
          <input
            type="text"
            className="px-3 bg-transparent h-9 flex-grow outline-none text-sm text-gray-600 placeholder-gray-400"
            placeholder="Search"
          />
          {/* search icon */}
          <AiOutlineSearch className=" text-3xl p-1 rounded-full mr-1 text-white bg-[#f87171] active:scale-105 transition transform duration-125" />
        </div>
        {/* Right section - dropdown and basic navgation */}
        <div className="flex" onClick={() => setDropdown(!dropdown)}>
          <GiHamburgerMenu className="text-4xl rounded text-gray-400 mr-3 active:scale-110 hover:bg-gray-200 p-1 transition transform duration-125" />
        </div>
        {/* dropdown menu for the hamburgur menu */}
        {dropdown && (
          <div className="absolute top-[85px] left-[6px] rounded-md bg-gray-300 p-3">
            <div className="w-[91vw]">
              <Link href="/">
                <div
                  onClick={() => setDropdown(false)}
                  className="p-2 bg-white rounded-md my-2 font-semibold text-gray-700"
                >
                  <span>Home</span>
                </div>
              </Link>
              <Link href="/about">
                <div
                  onClick={() => setDropdown(false)}
                  className="p-2 hover:bg-gray-200 rounded-md my-2 font-semibold text-gray-700"
                >
                  <span>About</span>
                </div>
              </Link>
              <Link href="/servicesInfo">
                <div
                  onClick={() => setDropdown(false)}
                  className="p-2 hover:bg-gray-200 rounded-md my-2 font-semibold text-gray-700"
                >
                  <span>Services</span>
                </div>
              </Link>
              <Link href="/contact">
                <div
                  onClick={() => setDropdown(false)}
                  className="p-2 hover:bg-gray-200 rounded-md my-2 font-semibold text-gray-700"
                >
                  <span>Contact Info</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;

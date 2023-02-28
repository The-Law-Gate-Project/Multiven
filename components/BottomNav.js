import Link from "next/link";
import { BsFillBagFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

function BottomNav() {
  return (
    <>
      <main className="z-10 sticky bottom-0 pt-4 pb-3 bg-gray-300">
        <div className="flex items-center justify-center space-x-[60px]">
          <div className="active:scale-105 active:bg-white w-16">
            <Link href="#">
              <span className="flex flex-col items-center space-y-1">
                <FaBell className="text-xl text-gray-800" />
                <span className="text-xs">Alerts</span>
              </span>
            </Link>
          </div>
          <div className="active:scale-105 active:bg-white w-16 rounded-md">
            <Link href="#">
              <span className="flex flex-col items-center space-y-1">
                <BsFillBagFill className="text-xl text-gray-800" />
                <span className="text-xs">Bag</span>
              </span>
            </Link>
          </div>
          <div className="active:scale-105 active:bg-white w-16 rounded-md">
            <Link href="#">
              <span className="flex flex-col items-center space-y-1">
                <FaUserCircle className="text-xl text-gray-800" />
                <span className="text-xs">Account</span>
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default BottomNav;

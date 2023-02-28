import { GiKnifeFork } from "react-icons/gi";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import Link from "next/link";

function Services() {
  return (
    <>
      <main className="flex items-center space-x-10 justify-center">
        <div className="flex items-center flex-col">
          <Link href={"/foodVendors"}>
            <div className="w-20 h-20 m-1 rounded-md bg-[#f87171] flex items-center justify-center active:scale-105 transition transform duration-150 ease-out">
              <GiKnifeFork className="text-white text-5xl" />
            </div>
          </Link>
          <span className="font-semibold text-gray-700">Food</span>
        </div>
        <div className="flex items-center flex-col">
          <div className="w-20 h-20 m-1 rounded-md bg-[#f87171] flex items-center justify-center active:scale-105 transition transform duration-150 ease-out">
            <MdLocalGroceryStore className="text-white text-5xl" />
          </div>
          <span className="font-semibold text-gray-700">Groceries</span>
        </div>
        <div className="flex items-center flex-col">
          <div className="w-20 h-20 m-1 rounded-md bg-[#f87171] flex items-center justify-center active:scale-105 transition transform duration-150 ease-out">
            <FaCarAlt className="text-white text-5xl" />
          </div>
          <span className="font-semibold text-gray-700">Rentals</span>
        </div>
      </main>
    </>
  );
}

export default Services;

import React from "react";
import Image from "next/image";
import Link from "next/link";

const FoodVendorCard = ({ imgSrc, vendorName }) => {
  return (
    <>
      <main className="flex items-center justify-center my-[40px]">
        <div className="flex items-center justify-center flex-col">
          <Image
            src={imgSrc}
            width={500}
            height={300}
            className="rounded-md active:opacity-90"
            alt="vendor cover pic"
          />
          <span className="mt-[-38px] flex justify-center p-5 active:scale-105 transition transform duration-150 rounded-md text-xl bg-opacity-80 bg-gray-200 w-[300px] text-gray-800 font-semibold">
            {vendorName}
          </span>
        </div>
      </main>
    </>
  );
};

export default FoodVendorCard;

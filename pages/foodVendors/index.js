import React from "react";
import axios from "axios";
import FoodVendorCard from "../../components/FoodVendorCard";
import Link from "next/link";

const index = ({ foodVendors }) => {
  return (
    <>
      <main className="px-8 mt-5">
        <h1 className="text-3xl text-gray-700 font-semibold">Order Food</h1>
        {foodVendors?.map((vendor) => {
          return (
            <div key={vendor._id}>
              <Link href={`/foodItems/${vendor._id}`} passHref>
                <FoodVendorCard
                  imgSrc={vendor.coverImage}
                  vendorName={vendor.name}
                />
              </Link>
            </div>
          );
        })}
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const resp = await axios.get("http://localhost:3000/api/vendors");
  return {
    props: {
      foodVendors: resp.data,
    },
  };
}

export default index;

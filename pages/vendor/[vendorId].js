import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodItemCard from "../../components/FoodItemCard";
import { BsPlus, BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/features/modal/modalSlice";
import CreateFoodModal from "../../components/CreateFoodModal";

// ! below is the dashboard of the vendors

const VendorDash = ({ foodItems, vendorDetails }) => {
  const [tabToggle, setTabToggle] = useState(true);
  const dispatch = useDispatch();
  const { createFoodIsOpen } = useSelector((store) => store.modal);
  return (
    <>
      <main className="">
        <section className="text-2xl py-3 pt-5 pl-3 font-bold flex items-center justify-start space-x-[210px]">
          <span>{vendorDetails.name}</span>
          <button
            onClick={() => dispatch(openModal("createFood"))}
            type="button"
          >
            <BsPlusLg className="bg-red-400 active:scale-105 transition transform duration-150 text-white text-5xl p-2 rounded-lg" />
          </button>
        </section>
        {/* TAB TOGGLE SECTION */}
        <section className="flex justify-evenly my-5">
          <div
            onClick={() => {
              setTabToggle(true);
            }}
            className={`flex justify-center flex-1  p-1 border-gray-500 border-t-[1px] rounded-t-2xl border-r-[1px] ${
              tabToggle
                ? "bg-red-300 font-semibold text-gray-700 border-b-none"
                : "border-b-[1px] bg-black bg-opacity-10 text-gray-600"
            } `}
          >
            <span>Food Items</span>
          </div>
          <div
            onClick={() => {
              setTabToggle(false);
            }}
            className={`flex justify-center flex-1 p-1 border-gray-500 border-t-[1px] rounded-t-2xl border-r-[1px] ${
              !tabToggle
                ? "bg-blue-200 font-semibold text-gray-700 border-b-none"
                : "border-b-[1px] bg-black bg-opacity-10 text-gray-600"
            } `}
          >
            <span>Orders</span>
          </div>
        </section>
        {/* FOOD VENDOR FOOD ITEMS LISTING */}
        {tabToggle && (
          <section className="px-4">
            {foodItems?.map((item) => {
              return (
                <FoodItemCard
                  key={item._id}
                  foodName={item.foodName}
                  foodPic={item.foodPic}
                  isVeg={item.category}
                  vendorName={vendorDetails.name}
                  isAvailable={item.isAvailable}
                  foodId={item._id}
                  options={item.options}
                />
              );
            })}
          </section>
        )}
        <span className="italic text-xs text-gray-600">
          Fssai No. : {vendorDetails.fssaiNum}
        </span>
        {createFoodIsOpen && (
          <CreateFoodModal vendorId={vendorDetails.vendorId} />
        )}
      </main>
    </>
  );
};

export default VendorDash;

export async function getServerSideProps({ query }) {
  const { vendorId } = query;
  // * making axios get request to get all the food items which are under a particular food vendor
  const resp = await axios.get(
    `http://localhost:3000/api/foodItems/${vendorId}`
  );
  const foodItems = resp.data;
  const resp2 = await axios.get(
    `http://localhost:3000/api/vendors/${vendorId}`
  );
  const vendorDetails = resp2.data;
  return {
    props: {
      foodItems,
      vendorDetails,
    },
  };
}

import React, { useRef } from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { GrSquare } from "react-icons/gr";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../redux/features/modal/modalSlice";
import { addToCart } from "../redux/features/cart/cartSlice";
import { v4 as uuidv4 } from "uuid";

const FoodItemModal = ({ foodObject }) => {
  const dispatch = useDispatch();
  const {
    foodPic,
    foodName,
    foodDesc,
    isAvailable,
    _id,
    options,
    extraOptions,
    category,
  } = foodObject;

  // ! COMPONENT STATES
  const [foodRating, setFoodRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [baseFoodPrice, setBaseFoodPrice] = useState(options[0].price);
  const [extrasPrice, setExtrasPrice] = useState(0);
  const [extras, setExtras] = useState([]); // * this usestate is for storing the selected extra options so that we can send it to the redux vendor cart

  async function getFoodRating(foodId) {
    const resp = await axios.get(
      `http://localhost:3000/api/foodReview/${foodId}`
    );
    if (resp.data.length > 0) {
      let totalRating = 0;
      for (let i = 0; i < resp.data.length; i++) {
        totalRating += resp.data[i].rating;
      }
      return parseFloat(totalRating / resp.data.length);
    }
    return 0;
  }

  return (
    <>
      <main
        onLoad={async () => {
          let avgRating = await getFoodRating(_id);
          setFoodRating(avgRating);
        }}
        className="h-full w-full fixed top-0 left-0 bg-[#45454582] flex items-center justify-center"
      >
        <div className="bg-white w-[360px] h-fit rounded-md p-[15px]">
          <div className="flex justify-between items-center">
            <span onClick={() => dispatch(closeModal())}>
              <BiArrowBack className="text-xl text-gray-700" />
            </span>
            <span>
              {category == 0 ? (
                <GrSquare className="text-green-600" />
              ) : (
                <GrSquare className="text-red-600" />
              )}
            </span>
          </div>
          <div className="flex bg-white flex-col mt-4 text-gray-700">
            {/* below is an example of cropping the image to preserve the aspect ratio of the image by filling the parent container */}
            <div className="relative h-[180px]">
              <Image
                src={foodPic}
                fill={true}
                className="object-cover rounded-md"
                alt="food pic enlarged or cropped"
              />
            </div>
            <span className="text-2xl mt-3 mb-2 font-semibold ">
              {foodName}
            </span>
            <span className="text-sm text-gray-500 italic">{foodDesc}</span>
            <div className="flex justify-between items-center">
              <span className="my-3">
                {isAvailable == true ? (
                  <div className="bg-green-600 w-fit text-sm text-white py-[2px] rounded-md px-2">
                    Available for Delivery
                  </div>
                ) : (
                  <div className="bg-red-500 w-fit text-xs text-white py-[2px] rounded-md px-2">
                    Sorry, Currently Not available
                  </div>
                )}
              </span>
              <span className="flex items-center space-x-1 bg-yellow-300 px-[5px] rounded-md">
                <AiFillStar />
                <span>{foodRating.toFixed(1)}</span>
              </span>
            </div>
            {/* Options section start */}
            <div className="flex my-3 items-center justify-start space-x-3">
              <div className="text-black text-lg">Options:</div>
              <div className="flex space-x-2">
                {options?.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="form-check form-check-inline flex items-center space-x-1"
                    >
                      <input
                        className="focus:outline-none w-4 h-4 cursor-pointer"
                        type="radio"
                        name="inlineRadioOptions"
                        id={item.text}
                        onClick={(e) => {
                          setBaseFoodPrice(item.price);
                        }}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800 cursor-pointer"
                        htmlFor={item.text}
                      >
                        {item.text}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>{" "}
            {/* oprions section end */}
            {/* extras section start */}
            <div className="flex my-3 items-center justify-start space-x-3">
              <div className="text-black text-lg">Extras:</div>
              <div className="flex space-x-2">
                {extraOptions?.map((item) => {
                  return (
                    <div key={item._id} className="flex items-center mr-2">
                      <input
                        className="w-4 h-4"
                        type="checkbox"
                        name={item.text}
                        id={item.text}
                        onChange={(e) => {
                          if (e.target.checked == true) {
                            setExtrasPrice(extrasPrice + item.price);
                            setExtras((prev) => [...prev, item]);
                          }
                          if (e.target.checked == false) {
                            setExtrasPrice(extrasPrice - item.price);
                            setExtras(
                              // this logic removes an extra item from the extras array
                              extras.filter((extra) => extra._id !== item._id) // this logic means that is the extra.id and item.id is not equal just keep it inside the array and in case the ids do match remove that element from the array
                            );
                          }
                        }}
                      />
                      <label htmlFor={item.text} className="text-sm ml-1">
                        {item.text}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* extras section end */}
            <div className="flex justify-between">
              <div className="my-3 text-lg bg-orange-400 text-white px-2 py-1 rounded-md">
                Total: ₹{(baseFoodPrice + extrasPrice) * quantity}
              </div>
              <div className="flex justify-end my-3 items-center">
                <AiOutlineMinus
                  className="bg-orange-400 text-4xl py-2 border-r-[1px] rounded-l-md border-white text-white active:bg-orange-300"
                  onClick={() => setQuantity((c) => Math.max(c - 1, 1))}
                />
                <button
                  onClick={() => {
                    // sending the details of the product to the cart
                    let id = uuidv4();
                    dispatch(
                      addToCart({
                        baseFoodPrice,
                        extrasPrice,
                        quantity,
                        extras,
                        foodName,
                        category,
                        options,
                        id,
                      })
                    );

                    // UI changes when this button is clicked
                    dispatch(openModal("vendorCart"));
                    dispatch(closeModal());
                  }}
                  className="bg-orange-400 text-white px-3 py-[6px] active:bg-orange-300"
                >
                  Add {quantity == 1 ? null : quantity}
                </button>
                <AiOutlinePlus
                  className="bg-orange-400 text-4xl py-2 border-white border-l-[1px] rounded-r-md text-white active:bg-orange-300"
                  onClick={() => setQuantity(quantity + 1)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FoodItemModal;

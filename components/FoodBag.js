import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GrSquare } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { closeModal } from "../redux/features/modal/modalSlice";
import {
  increase,
  decrease,
  resetCart,
  removeItem,
} from "../redux/features/cart/cartSlice";
import Link from "next/link";

const FoodBag = () => {
  // component states
  const [showLarge, setShowLarge] = useState(false);
  const [payOptions, setPayOptions] = useState(false);

  const { quantity, products, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // scroll behaviour capture section

  const divRef = useRef(null);

  return (
    <>
      <main className="flex items-center justify-center">
        {/* small div for some information */}
        {!showLarge && (
          <div className="bg-orange-400 flex justify-between items-center p-2 rounded-md absolute bottom-20 w-[380px]">
            <span className="text-white text-xl ml-4">
              {quantity} Items in Bag
            </span>
            <button
              onClick={() => setShowLarge(true)}
              className="bg-white p-2 px-3 rounded-md font-bold text-gray-600"
            >
              Next
            </button>
          </div>
        )}
        {/* large cart component */}
        {showLarge && (
          <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* wrapper div */}
            <div className="flex flex-col relative">
              {/* header div */}
              <div className="sticky flex items-center top-0 p-2 space-x-[100px] shadow-lg bg-orange-400 rounded-t-md">
                <BiArrowBack
                  onClick={() => {
                    setShowLarge(false);
                    setPayOptions(false);
                  }}
                  className="text-2xl text-white"
                />
                <div className="">
                  <span className="text-2xl font-bold text-white">
                    Your Bag
                  </span>
                </div>
              </div>
              {/* content div */}
              <div
                ref={divRef}
                className="bg-gray-100 p-5 w-[370px] max-h-[550px] overflow-y-scroll"
              >
                {/* details section */}
                <div className="">
                  {products?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="text-gray-700 my-3 p-2 rounded-md shadow-md bg-white"
                      >
                        <div className="flex items-center mb-2 justify-start space-x-3">
                          <span>
                            {item.category == 0 ? (
                              <GrSquare className="text-green-600" />
                            ) : (
                              <GrSquare className="text-red-600" />
                            )}
                          </span>
                          <span className="text-2xl font-semibold">
                            {item.foodName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-semibold">
                            Price: ₹
                            {(item.baseFoodPrice + item.extrasPrice) *
                              item.quantity}
                          </span>
                          <div className="flex mr-1 items-center bg-orange-400 text-white px-3 space-x-3 p-2 rounded-md">
                            <AiOutlineMinus
                              className="font-semibold"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  dispatch(decrease(index));
                                } else if (quantity === 1) {
                                  dispatch(removeItem({ id: item.id, index }));
                                  dispatch(closeModal("vendorCart"));
                                } else {
                                  dispatch(removeItem({ id: item.id, index }));
                                }
                              }}
                            />
                            <span className="font-semibold">
                              {item.quantity}
                            </span>
                            <AiOutlinePlus
                              className="font-semibold"
                              onClick={() => dispatch(increase(index))}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex flex-col">
                            <span className="text-sm">
                              Option:&nbsp;&nbsp;
                              {item.options?.map((option) => {
                                if (item.baseFoodPrice === option.price) {
                                  return <span>{option.text}</span>;
                                }
                              })}
                            </span>
                            <span className="text-sm">
                              Extras:&nbsp;&nbsp;
                              {item.extras.length > 0 ? (
                                item.extras?.map((extra, index) => {
                                  if (index === item.extras.length - 1) {
                                    return <span>{extra.text}</span>;
                                  } else {
                                    return <span>{extra.text}, </span>;
                                  }
                                })
                              ) : (
                                <span>None</span>
                              )}
                            </span>
                          </div>
                          <span
                            onClick={() => {
                              if (quantity > 1) {
                                dispatch(removeItem({ id: item.id, index }));
                              } else {
                                dispatch(removeItem({ id: item.id, index }));
                                dispatch(closeModal("vendorCart"));
                              }
                            }}
                            className="bg-red-500 transition transform duration-150 active:scale-105 ease-in text-sm text-white mr-1 rounded-md p-1 px-2"
                          >
                            Remove
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr />
              {/* cart footer section */}
              <div className=" rounded-b-md p-3 bg-gray-100 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-700">
                  Total: ₹{total}
                </span>

                {payOptions ? (
                  <div className="flex items-center">
                    <Link href={"/userInfo"}>
                      <button className="bg-orange-400 font-semibold w-fit active:scale-105 transition transform duration-150 ease-out  shadow-md text-sm text-white p-2 m-2 rounded-md ">
                        Pay on Delivery
                      </button>
                    </Link>
                    <button className="bg-orange-400 font-semibold w-fit active:scale-105 transition transform duration-150 ease-out text-sm text-white p-2 m-2 rounded-md ">
                      Pay Online
                    </button>
                  </div>
                ) : (
                  <span>
                    <button
                      onClick={() => setPayOptions(true)}
                      className="bg-orange-400 text-white p-2 rounded-md mr-2 active:scale-105 transition transform duration-150 ease-out font-semibold"
                    >
                      Proceed to Pay
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default FoodBag;

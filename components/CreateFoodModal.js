import { BiArrowBack } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../redux/features/modal/modalSlice";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";

const CreateFoodModal = ({ vendorId }) => {
  // * vendor id will be sent to the backend without user notice
  const dispatch = useDispatch();

  // ! create food modal states

  const [foodName, setFoodName] = useState("");
  const [foodDesc, setFoodDesc] = useState("");
  const [foodPic, setfoodPic] = useState(""); // * this will just be picture url for now
  const [option, setOption] = useState({
    // * this state is for singular option of the food item
    text: "",
    price: "",
  });
  const [options, setOptions] = useState([]); //* this is an array which will contain objects which are option objects
  //   useEffect(() => {
  //     console.log(options);
  //     console.log(option);
  //   }, [options]);
  const [addOption, setAddOption] = useState(false); // * this is specifically for the options array
  const [addExtraOption, setAddExtraOption] = useState(false);

  const [category, setCategory] = useState(); // * 0 for veg and 1 for non-veg
  const [extra, setExtra] = useState({
    text: "",
    price: "",
  });
  const [extraOptions, setExtraOptions] = useState([]);

  return (
    <>
      <main className="h-full w-full fixed top-0 left-0 bg-[#45454582] flex items-center justify-center">
        <div className="bg-white w-[360px] h-fit rounded-md p-[15px]">
          <div className="flex justify-between items-center">
            <span onClick={() => dispatch(closeModal("createFood"))}>
              <BiArrowBack className="text-xl text-gray-700" />
            </span>
          </div>
          <form className="py-3 max-h-[550px] overflow-y-scroll">
            <span className="text-xl font-bold text-gray-700">
              Enter Food Details
            </span>
            <div className="flex flex-col space-y-1 my-4">
              <label htmlFor="foodName" className="text-gray-600 text-[14px]">
                Food Name
              </label>
              <input
                type="text"
                id="foodName"
                placeholder="enter food name..."
                required
                autoComplete="off"
                onChange={(e) => setFoodName(e.target.value)}
                className="border-2 border-gray-300 rounded-md p-1"
              />
            </div>
            <div className="flex flex-col space-y-1 my-4">
              <label htmlFor="foodDesc" className="text-gray-600 text-[14px]">
                Food Description
              </label>
              <textarea
                type="text"
                id="foodDesc"
                placeholder="describe in brief..."
                required
                autoComplete="off"
                onChange={(e) => setFoodDesc(e.target.value)}
                className="border-2 border-gray-300 rounded-md p-1"
              />
            </div>
            <div className="flex flex-col space-y-1 my-4">
              <label htmlFor="foodPic" className="text-gray-600 text-[14px]">
                Food Photo URL
              </label>
              <input
                type="text"
                id="foodPic"
                placeholder="paste food photo url..."
                required
                autoComplete="off"
                onChange={(e) => setfoodPic(e.target.value)}
                className="border-2 border-gray-300 rounded-md p-1"
              />
            </div>
            <div className="flex flex-col space-y-2 my-4">
              <label htmlFor="options" className="text-gray-600 text-[14px]">
                Food Options
              </label>

              {options?.map((item, index) => {
                return (
                  <div key={index} className="flex pl-4 space-x-4 items-center">
                    <span>{index + 1}.</span>
                    <div className="flex space-x-10">
                      <span>{item.text}</span>
                      <span>₹{item.price}</span>
                    </div>
                    <RxCross1
                      onClick={() =>
                        setOptions(
                          options.filter((item) => options[index] !== item)
                        )
                      }
                      className="mt-[1px] bg-red-300 text-gray-700 text-xl p-1 rounded-full"
                    />
                  </div>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setAddOption(true);
                }}
                className="bg-red-300 w-fit p-1 px-2 rounded-md text-white font-semibold"
              >
                Add option
              </button>

              {/* LIST OF FOOD ITEMS TO BE ADDED */}
              {addOption && (
                <div className="">
                  <div className="flex flex-col bg-slate-200 p-2 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-lg mb-2 bg-red-300 w-fit px-1 rounded-md">
                        Option
                      </span>
                      <RxCross1
                        onClick={() => setAddOption(false)}
                        className=" mr-1 bg-red-300 text-gray-700 text-2xl p-1 rounded-full"
                      />
                    </div>
                    <div className="flex space-y-2 flex-col text-gray-700">
                      <div className="flex space-x-2">
                        <label htmlFor="option">Option Name:</label>
                        <input
                          name="optionName"
                          type="text"
                          className="border-2 border-gray-300 rounded-md p-1 py-0"
                          placeholder="Enter Option"
                          required
                          onChange={(e) => {
                            setOption({ ...option, text: e.target.value });
                          }}
                        />
                      </div>
                      <div className="flex space-x-4">
                        <label htmlFor="option" className="">
                          Option Price:
                        </label>
                        <div className="flex space-x-12">
                          <input
                            name="optionPrice"
                            type="number"
                            className="border-2 border-gray-300 rounded-md w-[100px] p-1 py-0"
                            placeholder="Enter Price"
                            required
                            onChange={(e) => {
                              setOption({
                                ...option,
                                price: e.target.value,
                              });
                            }}
                          />
                          <button
                            onClick={() => {
                              setOptions([...options, option]);
                              setOption({ text: "", price: "" });
                              setAddOption(false);
                            }}
                            type="button"
                            className="bg-red-300 rounded-md px-2"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* CATEGORY SELECTION SECTION */}
              <div>
                <label htmlFor="category" className="text-gray-600 text-[14px]">
                  Category
                </label>{" "}
                <div
                  id="category"
                  className="flex place-items-center space-x-4 my-2 ml-1"
                >
                  <div className="flex space-x-1">
                    <input type="radio" id="veg" />
                    <label htmlFor="veg" className="text-gray-600">
                      Veg
                    </label>
                  </div>
                  <div className="flex space-x-1">
                    <input type="radio" id="nonveg" />
                    <label htmlFor="nonveg" className="text-gray-600">
                      Non-Veg
                    </label>
                  </div>
                </div>
              </div>
              {/* EXTRA OPTIONS SECTION */}

              <div className="flex flex-col space-y-3">
                <label htmlFor="options" className="text-gray-600 text-[14px]">
                  Extras
                </label>

                {extraOptions?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex pl-4 space-x-4 items-center"
                    >
                      <span>{index + 1}.</span>
                      <div className="flex space-x-10">
                        <span>{item.text}</span>
                        <span>₹{item.price}</span>
                      </div>
                      <RxCross1
                        onClick={() =>
                          setExtraOptions(
                            extraOptions.filter(
                              (item) => extraOptions[index] !== item
                            )
                          )
                        }
                        className="mt-[1px] bg-red-300 text-gray-700 text-xl p-1 rounded-full"
                      />
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    setAddExtraOption(true);
                  }}
                  className="bg-red-300 w-fit p-1 px-2 rounded-md text-white font-semibold"
                >
                  Add Extras
                </button>
                {addExtraOption && (
                  <div className="">
                    <div className="flex flex-col bg-slate-200 p-2 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-lg mb-2 bg-red-300 w-fit px-1 rounded-md">
                          Option
                        </span>
                        <RxCross1
                          onClick={() => setAddExtraOption(false)}
                          className=" mr-1 bg-red-300 text-gray-700 text-2xl p-1 rounded-full"
                        />
                      </div>
                      <div className="flex space-y-2 flex-col text-gray-700">
                        <div className="flex space-x-2">
                          <label htmlFor="option">Option Name:</label>
                          <input
                            name="optionName"
                            type="text"
                            className="border-2 border-gray-300 rounded-md p-1 py-0"
                            placeholder="Enter Option"
                            required
                            onChange={(e) => {
                              setExtra({ ...extra, text: e.target.value });
                            }}
                          />
                        </div>
                        <div className="flex space-x-4">
                          <label htmlFor="option" className="">
                            Option Price:
                          </label>
                          <div className="flex space-x-12">
                            <input
                              name="optionPrice"
                              type="number"
                              className="border-2 border-gray-300 rounded-md w-[100px] p-1 py-0"
                              placeholder="Enter Price"
                              required
                              onChange={(e) => {
                                setExtra({
                                  ...extra,
                                  price: e.target.value,
                                });
                              }}
                            />
                            <button
                              onClick={() => {
                                setExtraOptions([...extraOptions, extra]);
                                setExtra({ text: "", price: "" });
                                setAddExtraOption(false);
                              }}
                              type="button"
                              className="bg-red-300 rounded-md px-2"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button className="bg-blue-400 p-1 px-3 rounded-lg w-full text-white font-bold">
              Create Food Item
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateFoodModal;

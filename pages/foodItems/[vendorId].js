import axios from "axios";
import FoodItemCard from "../../components/FoodItemCard";
import { useEffect, useState } from "react";
import FoodItemModal from "../../components/FoodItemModal";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, openModal } from "../../redux/features/modal/modalSlice";
import FoodBag from "../../components/FoodBag";
import { useRouter } from "next/router";
import { resetCart } from "../../redux/features/cart/cartSlice";

const VendorFoodItemsList = ({ foodItems, vendor }) => {
  const { isOpen } = useSelector((state) => state.modal);
  const { vendorCartIsOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const [foodObject, setFoodObject] = useState({});

  // ! below is a very important code for detecting when a user leaves a page
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      // closes the vendorCartModal
      dispatch(closeModal("vendorCart"));
      // resets the cart object from the redux store when the user exits the menu page of a single vendor
      dispatch(resetCart());
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  // ! above code detects user navigation from one page to another

  return (
    <>
      <main
        className="px-4"
        // onMouseLeave={() => dispatch(closeModal("vendorCart"))}
      >
        {/* vendor title div */}
        <div className="text-xl mt-5 mb-2 font-bold text-gray-800">
          Food Items from {vendor.name}
        </div>
        <hr className="border-gray-300 border-[1px] " />
        {foodItems?.map((foodItem) => {
          return (
            <div
              className="my-5"
              onClick={() => {
                dispatch(openModal());
                setFoodObject(foodItem);
              }}
              key={foodItem._id}
            >
              <FoodItemCard
                foodId={foodItem._id}
                foodName={foodItem.foodName}
                foodPic={foodItem.foodPic}
                isVeg={foodItem.category}
                vendorName={vendor.name}
                isAvailable={foodItem.isAvailable}
                options={foodItem.options}
              />
            </div>
          );
        })}
        {/* <Bag /> */}

        {isOpen && <FoodItemModal foodObject={foodObject} />}
        {vendorCartIsOpen && <FoodBag />}
      </main>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const vendorId = params.vendorId;
  const foodItemResp = await axios.get(
    `http://localhost:3000/api/foodItems/${vendorId}`
  );
  const vendorResp = await axios.get(
    `http://localhost:3000/api/vendors/${vendorId}`
  );
  return {
    props: {
      foodItems: foodItemResp.data,
      vendor: vendorResp.data,
    },
  };
}

export default VendorFoodItemsList;

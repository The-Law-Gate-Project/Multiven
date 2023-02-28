import Image from "next/image";
import { GrSquare } from "react-icons/gr";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";

function FoodItemCard({
  foodName,
  foodPic,
  isVeg,
  vendorName,
  isAvailable,
  foodId,
  options,
}) {
  const [foodRating, setFoodRating] = useState(0);

  async function getFoodRating(foodId) {
    const resp = await axios.get(
      `http://localhost:3000/api/foodReview/${foodId}`
    );
    if (resp.data.length > 0) {
      let totalRating = 0;
      for (let i = 0; i < resp.data.length; i++) {
        totalRating += resp.data[i].rating;
      }
      return totalRating / resp.data.length;
    }
    return 0;
  }

  return (
    <>
      <main
        onLoad={async () => {
          let avgRating = await getFoodRating(foodId);
          setFoodRating(avgRating);
        }}
        className="flex justify-between p-2 shadow-md hover:bg-gray-100 rounded-md"
      >
        <div className="flex flex-col justify-center space-y-2 flex-grow">
          <div>
            <h1 className="text-lg font-semibold">{foodName}</h1>
            <span className="text-xs text-green-600">
              {vendorName}'s exclusive
            </span>
          </div>
          <div>₹{options[0].price}</div>
          <div className="flex items-center justify-start space-x-8">
            <span className="flex items-center space-x-1 bg-yellow-300 px-[5px] rounded-md">
              <AiFillStar />
              <span>{foodRating.toFixed(1)}</span>
            </span>
            <span className="text-xs text-gray-700 italic">
              {isAvailable ? (
                <div className="text-green-600 mr-6">Available</div>
              ) : (
                <div className="text-red-600">Not Available</div>
              )}
            </span>
            <span>
              {isVeg == 0 ? (
                <GrSquare className="text-green-600" />
              ) : (
                <GrSquare className="text-red-600" />
              )}
            </span>
          </div>
        </div>
        <Image
          src={foodPic}
          width={130}
          height={130}
          className="rounded-md"
          alt="food pic"
        />
      </main>
    </>
  );
}

export default FoodItemCard;

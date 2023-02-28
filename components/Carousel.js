import React, { useState, useEffect } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexChange = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden">
      {images.map((image, index) => (
        <img
          key={image.id}
          className={`absolute inset-0 object-cover ${
            index !== currentIndex ? "hidden" : ""
          } transition duration-500 ease-in-out transform ${
            currentIndex > index ? "-translate-x-full" : "translate-x-full"
          }`}
          src={image.src}
          alt={`Slide ${index + 1}`}
        />
      ))}
      <div className="absolute bottom-0 left-0 p-4">
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => handleIndexChange(currentIndex - 1)}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => handleIndexChange(currentIndex + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const HorizontalScrollCard = ({
  data = [],
  heading = "",
  trending,
  media_type = "movie",
}) => {
  const constainerRef = useRef();
  const handleNext = () => {
    constainerRef.current.scrollLeft += 300;
  };
  const handlePrevious = () => {
    constainerRef.current.scrollLeft -= 300;
  };
  return (
    <div className="container px-3 mx-auto my-10">
      <h2 className="mb-3 text-xl font-bold text-white capitalize lg:text-2xl">
        {heading}
      </h2>
      <div className="relative">
        <div
          className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 grid-flow-col overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-none"
          ref={constainerRef}
        >
          {data &&
            data.map((data, index) => {
              return (
                <Card
                  media_type={data.media_type || media_type}
                  key={data.id + "heading" + index}
                  data={data}
                  index={index + 1}
                  trending={trending}
                ></Card>
              );
            })}
        </div>
        <div className="absolute top-0 items-center justify-between hidden w-full h-full lg:flex">
          <button
            className="z-10 p-1 -ml-2 text-black bg-white rounded-full"
            onClick={handlePrevious}
          >
            <FaAngleLeft />
          </button>
          <button
            className="z-10 p-1 -mr-2 text-black bg-white rounded-full"
            onClick={handleNext}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;

import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  // console.log(`BannerHome ~ imageURL:`, imageURL);
  // console.log(`BannerHome ~ bannerData:`, bannerData);
  const [currentImage, setCurentImage] = useState(0);
  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurentImage((pre) => pre + 1);
    }
  };
  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurentImage((pre) => pre - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurentImage(0);
      }
    }, 2000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerData, imageURL, currentImage]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData &&
          bannerData.map((data, index) => {
            return (
              <div
                className="min-w-full lg:min-h-full h-[450px] overflow-hidden relative group transition-all"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                key={data.id + "BannerHome" + index}
              >
                <div className="w-full h-full">
                  <img
                    className="object-cover w-full h-full"
                    src={imageURL + data.backdrop_path}
                    alt=""
                  />
                </div>
                {/* button next and previous image */}
                <div className="absolute top-0 items-center justify-between hidden w-full h-full px-4 group-hover:lg:flex">
                  <button
                    className="z-10 p-1 text-xl text-black bg-white rounded-full"
                    onClick={handlePrevious}
                  >
                    <FaAngleLeft></FaAngleLeft>
                  </button>
                  <button
                    className="z-10 p-1 text-xl text-black bg-white rounded-full"
                    onClick={handleNext}
                  >
                    <FaAngleRight></FaAngleRight>
                  </button>
                </div>
                <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
                <div className="container mx-auto">
                  <div className="absolute bottom-0 w-full max-w-md px-4">
                    <h2 className="text-2xl font-bold text-white lg:text-4xl drop-shadow-2xl">
                      {data?.title || data?.name}
                    </h2>
                    <p className="my-1 text-ellipsis line-clamp-3">
                      {data.overview}
                    </p>
                    <div className="flex items-center gap-4">
                      <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                      <span>|</span>
                      <p>View : {Number(data.popularity).toFixed(0)}</p>
                    </div>
                    <button className="px-4 py-2 mt-4 font-bold text-black capitalize transition-all bg-white rounded hover:bg-gradient-to-t from-red-700 to-orange-500 hover:scale-105 hover:text-white">
                      <Link to={"/" + data.media_type + "/" + data.id}>
                        play now
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default BannerHome;

import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const mediaType = data.memedia_type ?? media_type;
  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full max-w-[230px] min-w-[230px] h-80 overflow-hidden rounded relative block hover:scale-105 transition-all"
    >
      {data?.poster_path ? (
        <img src={imageURL + data?.poster_path} alt="" />
      ) : (
        <img src="/no-image.png" alt="no-image" />
      )}
      <div className="absolute top-4">
        {trending && (
          <div className="px-4 py-1 overflow-hidden text-white rounded-r-full backdrop-blur-3xl bg-red-500/60">
            <span>#</span>
            {index} Trending
          </div>
        )}
      </div>
      <div className="absolute bottom-0 w-full h-16 p-2 bg-black/70 backdrop-blur-3xl">
        <h1 className="text-lg font-semibold text-ellipsis line-clamp-1">
          {data?.title || data?.name}
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-400">
            {moment(data.release_date).format("MMM Do YYYY")}
          </p>
          <p className="flex items-center px-1 text-xs text-white rounded backdrop-blur-3xl bg-red-500/60">
            Rating: {Number(data.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

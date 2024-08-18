import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetail from "../hooks/useFetchDetail";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../component/Divider";
import HorizontalScrollCard from "../component/HorizontalScrollCard";
import useFetch from "../hooks/useFetch";
import VideoPlay from "../component/VideoPlay";

const DetailPage = () => {
  const { explore, id } = useParams();
  const { data } = useFetchDetail(`/${explore}/${id}`);
  const { data: castData } = useFetchDetail(`/${explore}/${id}/credits`);
  const { data: similarData } = useFetch(`/${explore}/${id}/similar`);
  const { data: recommendationsData } = useFetch(
    `/${explore}/${id}/recommendations`
  );
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".");
  const writer = castData?.crew
    ?.filter((el) => el.job === "Writer")
    .map((el) => el?.name)
    .join(", ");
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");
  const handlePlayVideo = () => {
    setPlayVideoId(data.id);
    setPlayVideo(true);
  };
  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            className="object-cover w-full h-full"
            src={imageURL + data?.backdrop_path}
            alt=""
          />
        </div>
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-neutral-900/90 to-transparent"></div>
      </div>
      <div className="container flex flex-col gap-5 px-3 py-16 mx-auto lg:gap-10 lg:flex-row">
        <div className="relative mx-auto lg:-mt-28 w-fit min-w-60 lg:mx-0 lg:py-0">
          <img
            className="object-cover rounded h-80 w-60"
            src={imageURL + data?.poster_path}
            alt=""
          />
          <button
            onClick={() => handlePlayVideo(data)}
            className="w-full px-4 py-3 mt-3 text-lg font-bold text-black capitalize transition-all bg-white rounded hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105"
          >
            play now
          </button>
        </div>
        <div className="">
          <h2 className="text-xl font-bold text-white lg:text-4xl">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data.tagline}</p>
          <Divider></Divider>
          <div className="flex gap-3">
            <p>Rating: {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration: {duration[0]}h {duration[1]}m
            </p>
          </div>
          <div className="">
            <h3 className="mb-1 text-2xl font-bold text-white">Overview</h3>
            <p className="text-justify">{data?.overview}</p>
            <Divider></Divider>
            <div className="flex gap-3 my-2 text-center">
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>Release: {moment(data?.release_date).format("MMM Do YYYY")}</p>
              <span>|</span>
              <p>Revenue: {Number(data?.revenue)}</p>
            </div>
            <Divider></Divider>
          </div>
          <div>
            <p>
              <span className="text-white">Director:</span> {writer}
            </p>
            <Divider></Divider>
            <h2 className="text-lg font-bold">Cast:</h2>
            <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-6">
              {castData?.cast
                ?.filter((el) => el?.profile_path)
                .map((starCast, index) => {
                  return (
                    <div key={starCast.id}>
                      <div>
                        <img
                          src={imageURL + starCast.profile_path}
                          alt="imag-cast"
                          className="object-cover w-24 h-24 rounded-full"
                        />
                      </div>
                      <p className="font-bold text-center">{starCast?.name}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar " + explore}
        ></HorizontalScrollCard>
        <HorizontalScrollCard
          data={recommendationsData}
          heading={"recommendations " + explore}
        ></HorizontalScrollCard>
      </div>
      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={explore}
        ></VideoPlay>
      )}
    </div>
  );
};

export default DetailPage;

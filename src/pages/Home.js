import React from "react";
import BannerHome from "../component/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScrollCard from "../component/HorizontalScrollCard";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const trendingData = useSelector((state) => state.movieoData.bannerData);
  const { data: nowPlaying } = useFetch("movie/now_playing");
  const { data: topRated } = useFetch("/movie/top_rated");
  const { data: popularTvShowData } = useFetch("/tv/popular");
  const { data: onTheAirData } = useFetch("/tv/on_the_air");
  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard
        trending={true}
        data={trendingData}
        heading=" trending show"
      />
      <HorizontalScrollCard data={nowPlaying} heading=" now playing" />
      <HorizontalScrollCard data={topRated} heading="top rated movies" />
      <HorizontalScrollCard
        data={popularTvShowData}
        heading="popular TV show"
        media_type="tv"
      />
      <HorizontalScrollCard
        data={onTheAirData}
        heading="on the air"
        media_type="tv"
      />
    </div>
  );
};

export default Home;

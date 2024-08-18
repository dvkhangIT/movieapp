import React from "react";
import { IoClose } from "react-icons/io5";
import useFetch from "../hooks/useFetch";

const VideoPlay = ({ data, close = () => {}, media_type }) => {
  const { data: videoData } = useFetch(`/${media_type}/${data}/videos`);
  return (
    <section
      onClick={close}
      className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-opacity-50 bg-neutral-700"
    >
      <div className="relative max-h-[80vh] w-full max-w-screen-lg bg-black rounded  aspect-video">
        <button
          onClick={close}
          className="absolute z-50 text-3xl -right-1 -top-6"
        >
          <IoClose></IoClose>
        </button>
        <iframe
          className="w-full h-full"
          title={data}
          allowFullScreen
          src={`https://www.youtube.com/embed/${videoData[0]?.key}`}
        ></iframe>
      </div>
    </section>
  );
};

export default VideoPlay;

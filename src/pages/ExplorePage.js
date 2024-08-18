import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../component/Card";

const ExplorePage = () => {
  const param = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [, setTotalPage] = useState(1);
  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${param.explore}`, {
        params: {
          page: pageNumber,
        },
      });
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
      setTotalPage(response.data.total_pages);
    } catch (error) {
      console.log(`fetchData ~ error:`, error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageNumber]);
  useEffect(() => {
    setPageNumber(1);
    setData([]);
    fetchData();
  }, []);
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNumber((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="my-3 text-lg font-semibold capitalize lg:text-xl">
          Popular {param.explore} show
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 lg:justify-start justify-center">
          {data.map((exploreData, index) => {
            return (
              <div
                className=""
                key={exploreData.id + "exploresecction" + index}
              >
                <Card media_type={param.explore} data={exploreData}></Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;

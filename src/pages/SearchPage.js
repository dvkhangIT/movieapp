import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../component/Card";

const SearchPage = () => {
  const location = useLocation();
  // console.log(`SearchPage ~ location:`, location.search.slice(3));
  const query = location?.search?.slice(3);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: page,
        },
      });
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
    } catch (error) {
      console.log(`fetchData ~ error:`, error);
    }
  };
  useEffect(() => {
    if (query) {
      fetchData();
      setPage(1);
      setData([]);
    }
  }, [location?.search]);
  const handleScroll = (e) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="py-16">
      <div className="sticky mx-1 my-2 top-[70px] z-30 lg:hidden">
        <input
          className="w-full px-4 py-1 text-lg bg-white rounded-full outline-0 text-neutral-900"
          type="text"
          placeholder="Search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query.split("%20").join(" ")}
        />
      </div>
      <div className="container mx-auto">
        <h3 className="my-3 text-lg font-semibold capitalize lg:text-xl">
          search results
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((searchData, index) => {
            return (
              <div key={searchData.id + "search" + index}>
                <Card
                  media_type={searchData.media_type}
                  data={searchData}
                ></Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

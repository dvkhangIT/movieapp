import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import MobileNavigation from "./component/MobileNavigation";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./store/movieoSlice";

function App() {
  const dispatch = useDispatch();
  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      dispatch(setBannerData(response.data.results));
      // console.log(`fetchTrendingData ~ response:`, response);
    } catch (error) {
      console.log(`fetchTrendingData ~ error:`, error);
    }
  };
  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log(`fetchConfiguration ~ error:`, error);
    }
  };
  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="pb-14 lg:pb-0">
      <Header></Header>
      <div className="min-h-[90vh]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <MobileNavigation></MobileNavigation>
    </main>
  );
}

export default App;

import App from "../App";
import Home from "../pages/Home";
import { createBrowserRouter } from "react-router-dom";
import ExplorePage from "../pages/ExplorePage";
import DetailPage from "../pages/DetailPage";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: ":explore",
        element: <ExplorePage></ExplorePage>,
      },
      {
        path: ":explore/:id",
        element: <DetailPage></DetailPage>,
      },
      {
        path: "search",
        element: <SearchPage></SearchPage>,
      },
    ],
  },
]);

export default router;

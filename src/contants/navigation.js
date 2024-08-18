import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { MdHomeFilled } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";

export const navigation = [
  {
    label: "tv show",
    href: "tv",
    icon: <PiTelevisionFill />,
  },
  {
    label: "movies",
    href: "movie",
    icon: <BiSolidMoviePlay />,
  },
];
export const mobileNavigation = [
  {
    label: "home",
    href: "/",
    icon: <MdHomeFilled />,
  },
  ...navigation,
  {
    label: "search",
    href: "/search",
    icon: <IoSearchOutline />,
  },
];

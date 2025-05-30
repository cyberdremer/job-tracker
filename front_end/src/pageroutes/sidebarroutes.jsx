import { Icon } from "@chakra-ui/react";
import { FaChartBar, FaUser, FaHome } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const dashboardRoutes = [
  {
    icon: <FaHome></FaHome>,
    title: "Home",
    path: "/dashboard",
  },
  {
    icon: <FaChartBar></FaChartBar>,
    title: "Visualizations",
    path: "/dashboard/visualizations",
  },

  {
    icon: <FaUser></FaUser>,
    title: "Account Info",
    path: "/dashboard/accountinfo",
  },
  {
    icon: <LuLogOut></LuLogOut>,
    title: "Log Out",
    path: "/logout",
  },
];

export default dashboardRoutes;

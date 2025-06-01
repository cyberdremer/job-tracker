import Dashboard from "@/pages/dashboard";
import Account from "@/pages/account";
import Visualization from "@/pages/visualization";
const authedData = [
  { path: "/dashboard", element: <Dashboard></Dashboard>, title: "Dashboard" },
  {
    path: "/dashboard/visualizations",
    element: <Visualization></Visualization>,
    title: "Visualization",
  },
  {
    path: "/dashboard/accountinfo",
    element: <Account></Account>,
    title: "Account Info",
  },
];

export default authedData;

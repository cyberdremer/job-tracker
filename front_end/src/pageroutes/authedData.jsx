import Dashboard from "@/pages/dashboard";
import Account from "@/pages/account";
const authedData = [
  { path: "/dashboard", element: <Dashboard></Dashboard>, title: "Dashboard" },
  { path: "/dashboard/visualization", element: {}, title: "Visualization" },
  { path: "/dashboard/accountinfo", element: <Account></Account>, title: "Account Info" },
];

export default authedData;

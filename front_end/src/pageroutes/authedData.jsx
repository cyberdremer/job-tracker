import Dashboard from "@/pages/dashboard";
import Account from "@/pages/account";
import Visualization from "@/pages/visualization";
import RequireAuth from "./protection";
const authedData = [
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <Dashboard></Dashboard>
      </RequireAuth>
    ),
    title: "Dashboard",
  },
  {
    path: "/dashboard/visualizations",
    element: (
      <RequireAuth>
        <Visualization></Visualization>
      </RequireAuth>
    ),
    title: "Visualization",
  },
  {
    path: "/dashboard/accountinfo",
    element: (
      <RequireAuth>
        <Account></Account>
      </RequireAuth>
    ),
    title: "Account Info",
  },
];

export default authedData;

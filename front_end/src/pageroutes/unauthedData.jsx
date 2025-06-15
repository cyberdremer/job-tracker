import Login from "@/pages/login";
import SignUp from "@/pages/signup";
import Landing from "@/pages/landing";
import LogOut from "@/pages/logout";
const unAuthedData = [
  { path: "/login", element: <Login></Login>, title: "Login" },
  { path: "/signup", element: <SignUp></SignUp>, title: "Signup" },
  { path: "/", element: <Landing></Landing>, title: "Landing Page" },
  { path: "/logout", element: <LogOut></LogOut>, title: "Log Out" },
];

export default unAuthedData;

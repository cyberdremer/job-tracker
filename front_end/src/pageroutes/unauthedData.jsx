import Login from "@/pages/login";
import SignUp from "@/pages/signup";
import Landing from "@/pages/landing";
const unAuthedData = [
  { path: "/login", element: <Login></Login>, title: "Login" },
  { path: "/signup", element: <SignUp></SignUp>, title: "Signup" },
  { path: "/", element: <Landing></Landing>, title: "Landing Page" },
];


export default unAuthedData;
import { Route, Routes } from "react-router";
import Layout from "@/pages/layout";
import unAuthedData from "./unauthedData";
import authedData from "./authedData";
import AuthedLayout from "@/pages/authedlayout";

const UnauthedViews = () => {
  const uauthedViews = unAuthedData.map(({ path, element, title }) => {
    return <Route path={`${path}`} element={element} title={title}></Route>;
  });
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        {uauthedViews}
      </Route>
    </Routes>
  );
};

const AuthedViews = () => {
  const authedViews = authedData.map(({ path, element, title }) => {
    return <Route path={`${path}`} element={element} title={title}></Route>;
  });
  return (
    <Routes>
      <Route path="/dashboard" element={<AuthedLayout></AuthedLayout>}>
        {authedViews}
      </Route>
    </Routes>
  );
};

export  {UnauthedViews, AuthedViews};

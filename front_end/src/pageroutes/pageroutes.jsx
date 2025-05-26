import { Route, Routes } from "react-router";
import Layout from "@/pages/layout";
import unAuthedData from "./unauthedData";

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

export default UnauthedViews;

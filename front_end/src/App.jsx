import { useState } from "react";
import { Container } from "@chakra-ui/react";
import { BrowserRouter } from "react-router";
import { UnauthedViews, AuthedViews } from "./pageroutes/pageroutes";

function App() {
  return (
    <Container minHeight="100vh" maxWidth="100%" padding="0" margin="0">
      <BrowserRouter>
        <UnauthedViews></UnauthedViews>
        <AuthedViews></AuthedViews>
      </BrowserRouter>
    </Container>
  );
}

export default App;

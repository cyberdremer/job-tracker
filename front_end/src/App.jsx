import { useState } from "react";
import { Container } from "@chakra-ui/react";
import { BrowserRouter } from "react-router"
import UnauthedViews from "./pageroutes/pageroutes";

function App() {
  return (
    <Container minHeight="100vh" maxWidth="100%" padding="0" margin="0">
      <BrowserRouter>
        <UnauthedViews></UnauthedViews>
      </BrowserRouter>
    </Container>
  );
}

export default App;

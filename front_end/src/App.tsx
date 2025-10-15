import { useState } from "react";
import { Container } from "@chakra-ui/react";
import { BrowserRouter } from "react-router";
import { UnauthedViews, AuthedViews } from "./pageroutes/pageroutes";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
    },
  },
};
const queryClient = new QueryClient(queryClientOptions);

function App() {
  return (
    <Container minHeight="100vh" maxWidth="100%" padding="0" margin="0">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UnauthedViews></UnauthedViews>
          <AuthedViews></AuthedViews>
        </BrowserRouter>
      </QueryClientProvider>
    </Container>
  );
}

export default App;

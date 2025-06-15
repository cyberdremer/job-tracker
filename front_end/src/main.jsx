import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/authcontext";
import { InfoProvider } from "./context/infocontext";
import { Provider } from "./components/ui/provider";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <InfoProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </InfoProvider>
    </Provider>
  </StrictMode>
);

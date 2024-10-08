import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
);

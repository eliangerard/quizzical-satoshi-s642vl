import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

//Mostrar en la consola los tipos de pokemon

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

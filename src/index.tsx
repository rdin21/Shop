import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

function Index(): JSX.Element {
  return (
    // <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    // </StrictMode>
  );
}
const root = document.getElementById("root");

if (root) {
  render(<Index />, root);
}

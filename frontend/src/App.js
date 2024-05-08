// App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  return (
    <div className="container mt-4">
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;

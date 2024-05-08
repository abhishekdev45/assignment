import { Routes, Route } from "react-router-dom";
import FormComponent from "../components/FormComponent";
import Dashboard from "../components/Dashboard";

export const AllRoutes = () => {
  return (
    <div className="dark:bg-darkbg">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<FormComponent />} />
      </Routes>
    </div>
  );
};

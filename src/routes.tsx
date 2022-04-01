import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";

function MyRoutes() {
  return (
    <Routes>
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default MyRoutes;

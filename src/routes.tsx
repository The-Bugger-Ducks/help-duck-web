import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";

function MyRoutes() {
  return (
    <Routes>
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default MyRoutes;

import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";

function MyRoutes() {
  return (
    <Routes>
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default MyRoutes;

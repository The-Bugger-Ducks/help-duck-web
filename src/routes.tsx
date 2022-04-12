import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import DetailTicket from "./pages/Ticket/DetailTicket";

function MyRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ticket/:id" element={<DetailTicket />} />
    </Routes>
  );
}

export default MyRoutes;

import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/User/Signup";
import UserEdit from "./pages/User/UserEdit";
import DetailTicket from "./pages/Ticket/DetailTicket";
import TicketRegister from "./pages/Ticket/TicketRegister";

function MyRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user/edit/:id" element={<UserEdit />} />
      <Route path="/ticket/:id" element={<DetailTicket />} />
      <Route path="/ticket_register" element={<TicketRegister />} />
    </Routes>
  );
}

export default MyRoutes;

import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import UserEdit from "./pages/Login/UserEdit";
import DetailTicket from "./pages/Ticket/DetailTicket";
import TicketRegister from "./pages/Ticket/TicketRegister";

function MyRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user_edit" element={<UserEdit />} />
      <Route path="/ticket/:id" element={<DetailTicket />} />
      <Route path="/ticket_register" element={<TicketRegister />} />
    </Routes>
  );
}

export default MyRoutes;

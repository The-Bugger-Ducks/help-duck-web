import { Routes, Route } from "react-router-dom";
import EquipmentRegister from "./pages/Equipment/EquipmentRegister";
import EquipmentUpdate from "./pages/Equipment/EquipmentUpdate";

import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import DetailTicket from "./pages/Ticket/DetailTicket";
import TicketRegister from "./pages/Ticket/TicketRegister";

function MyRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ticket/:id" element={<DetailTicket />} />
      <Route path="/ticket_register" element={<TicketRegister />} />
      <Route path="/equipment_register" element={<EquipmentRegister />} />
      <Route path="/equipment_update/:id" element={<EquipmentUpdate />} />
    </Routes>
  );
}

export default MyRoutes;

import React from "react";
import "../styles/components/Tickets.css";

interface TicketInformationProps {
  priority: string;
  title: string;
  creationDate: string;
  status: string;
}

const Ticket: React.FC<TicketInformationProps> = ({
  priority = "",
  title = "",
  creationDate = "",
  status = "",
}) => {
  return (
    <tr>
      <td>{priority}</td>
      <td>{title}</td>
      <td>{creationDate}</td>
      <td>{status}</td>
    </tr>
  );
};

export default Ticket;

import React from "react";
import "../styles/components/TicketTable.css";

interface TicketInformationProps {
  priority: React.ReactElement | string;
  title: React.ReactElement | string;
  creationDate: React.ReactElement | string;
  status: React.ReactElement | string;
  onClick?: () => void;
}

const Ticket: React.FC<TicketInformationProps> = ({
  priority,
  title,
  creationDate,
  status,
  onClick,
}) => {
  return (
    <tr onClick={onClick}>
      <td>{priority}</td>
      <td className="ticket-title">{title}</td>
      <td>{creationDate}</td>
      <td id="ticket-status">{status}</td>
    </tr>
  );
};

export default Ticket;

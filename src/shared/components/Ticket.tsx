import React from "react";

interface TicketInformationProps {
  priority: React.ReactElement | string;
  title: React.ReactElement | string;
  creationDate: React.ReactElement | string;
  status: React.ReactElement | string;
}

const Ticket: React.FC<TicketInformationProps> = ({
  priority,
  title,
  creationDate,
  status,
}) => {
  return (
    <tr>
      <td>{priority}</td>
      <td className="ticket-title">{title}</td>
      <td>{creationDate}</td>
      <td>{status}</td>
    </tr>
  );
};

export default Ticket;

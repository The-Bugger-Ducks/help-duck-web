import React from "react";

interface TicketInformationProps {
  priority: any;
  title: string;
  creationDate: string;
  status: any;
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
      <td>{title}</td>
      <td>{creationDate}</td>
      <td>{status}</td>
    </tr>
  );
};

export default Ticket;

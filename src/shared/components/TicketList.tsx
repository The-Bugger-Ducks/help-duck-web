import "../styles/components/TicketList.css";
import StatusTicket from "./StatusTicket";
import Ticket from "./Ticket";
import PriorityLevelBadge from "../components/PriorityLevelBadge";

import { useNavigate } from "react-router-dom";

export default function TicketList() {
  const navigate = useNavigate();

  const ticketInformationMocked = [
    {
      id: "6250a1cbfaa3df5a2a88faae",
      priority: "medium",
      title:
        "tituloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
      creationDate: "12/03/2022",
      status: "underAnalysis",
    },
    {
      id: "6250a2a3faa3df5a2a88faaf",
      priority: "medium",
      title: "tituloooooooooooooooooooooooo",
      creationDate: "12/03/2022",
      status: "underAnalysis",
    },
  ];

  return (
    <section className="ticket-list-container">
      <div className="grid-tickets">
        <table>
          <tbody>
            <tr>
              <th>Prioridade</th>
              <th>Título</th>
              <th>Data de criação</th>
              <th>Status</th>
            </tr>
            {ticketInformationMocked.map((ticket, index) => {
              return (
                <Ticket
                  key={index}
                  priority={
                    <PriorityLevelBadge priority={ticket?.priority as any} />
                  }
                  title={ticket.title}
                  creationDate={ticket.creationDate}
                  status={<StatusTicket status="underAnalysis" />}
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

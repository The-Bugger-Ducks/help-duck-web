import "../styles/components/TicketList.css";
import StatusTicket from "./StatusTicket";
import Ticket from "./Ticket";
import PriorityLevelBadge from "../components/PriorityLevelBadge";

export default function TicketList() {
  const ticketInformationMocked = [
    {
      priority: "medium",
      title:
        "tituloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
      creationDate: "12/03/2022",
      status: "underAnalysis",
    },
    {
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
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

import "../styles/components/TicketList.css";
import StatusTicket from "./StatusTicket";
import Ticket from "./Ticket";

export default function TicketList() {
  const ticketInformationMocked = [
    {
      priority: "Normal",
      title: "titulooooooooooooooooooooooooooo...",
      creationDate: "12/03/2022",
      status: "underAnalysis",
    },
    {
      priority: "Alta",
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
            {ticketInformationMocked.map((item, index) => {
              return (
                <Ticket
                  key={index}
                  priority={item.priority}
                  title={item.title}
                  creationDate={item.creationDate}
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

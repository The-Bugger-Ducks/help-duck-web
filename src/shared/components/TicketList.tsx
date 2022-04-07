import "../styles/components/TicketList.css";
import Ticket from "./Ticket";

export default function TicketList() {
  return (
    <section className="ticket-list-container">
      <div className="grid-tickets">
        <table>
          <tr>
            <th>Prioridade</th>
            <th>Título</th>
            <th>Data de criação</th>
            <th>Status</th>
          </tr>
          <Ticket
            priority={"Teste"}
            title={"Teste"}
            creationDate={"Teste"}
            status={"Teste"}
          />
        </table>
      </div>
    </section>
  );
}

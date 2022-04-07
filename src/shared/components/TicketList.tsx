import "../styles/components/TicketList.css";

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
          <tr>
            <td>Teste</td>
            <td>Teste</td>
            <td>Teste</td>
            <td>Teste</td>
          </tr>
        </table>
      </div>
    </section>
  );
}

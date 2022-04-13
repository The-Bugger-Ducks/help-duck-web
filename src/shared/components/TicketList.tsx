import "../styles/components/TicketList.css";
import StatusTicket from "./StatusTicket";
import TicketComponent from "./Ticket";
import PriorityLevelBadge from "../components/PriorityLevelBadge";
import { TicketRequests } from "../utils/requests/Ticket.requests";
import Ticket from "../../shared/interfaces/ticket.interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../interfaces/user.interface";

const TicketList: React.FC<{ role: User["role"] }> = ({ role = "client" }) => {
  const ticketRequest = new TicketRequests();
  const [tickets, setTickets] = useState<Ticket[]>();
  const navigate = useNavigate();

  useEffect(() => {
    getTicketList();
  }, []);

  const getTicketList = async () => {
    if (role === "client") {
      const response: { content: Array<Ticket> } =
        await ticketRequest.ticketListRequest();
      setTickets(response.content);
    } else if (role === "support") {
      const response: { content: Array<Ticket> } =
        await ticketRequest.ticketListRequestOpened();
      setTickets(response.content);
    } else {
      alert("Usuário sem permissão para visualizar chamados");
      setTickets([]);
    }
  };

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
            {tickets && tickets.length > 0 ? (
              tickets.map((ticket, index) => {
                return (
                  <TicketComponent
                    key={index}
                    priority={
                      <PriorityLevelBadge priority={ticket?.priorityLevel} />
                    }
                    title={ticket.title}
                    creationDate={new Date(
                      ticket.createdAt
                    ).toLocaleDateString()}
                    status={<StatusTicket status={ticket?.status} />}
                    onClick={() => navigate(`/ticket/${ticket.id}`)}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="no-results">
                  Não foi encontrado nenhum chamado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TicketList;

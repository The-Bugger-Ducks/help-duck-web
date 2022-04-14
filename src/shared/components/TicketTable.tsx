import { useNavigate } from "react-router-dom";

import TicketComponent from "./Ticket";
import StatusTicket from "./StatusTicket";
import PriorityLevelBadge from "../components/PriorityLevelBadge";

import Ticket from "../interfaces/ticket.interface";

import "../styles/components/TicketList.css";

const TicketTable: React.FC<{ tickets: Array<Ticket> }> = ({ tickets }) => {
  const navigate = useNavigate();

  return (
    <table>
      <tbody>
        <tr>
          <th>Prioridade</th>
          <th>Título</th>
          <th>Data de criação</th>
          <th>Status</th>
        </tr>
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => {
            return (
              <TicketComponent
                key={index}
                priority={
                  <PriorityLevelBadge priority={ticket?.priorityLevel} />
                }
                title={ticket.title}
                creationDate={new Date(ticket.createdAt).toLocaleDateString()}
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
  );
};

export default TicketTable;

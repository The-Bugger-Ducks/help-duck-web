import { useNavigate } from "react-router-dom";

import TicketComponent from "./Ticket";
import StatusTicket from "./StatusTicket";
import PriorityLevelBadge from "../components/PriorityLevelBadge";

import Ticket from "../interfaces/ticket.interface";
import { SortTableTypes } from "../constants/sortTableEnum";

import "../styles/components/TicketList.css";

const TicketTable: React.FC<{ tickets: Array<Ticket>, handleTableSorting: (type: SortTableTypes) => void }> = ({ tickets, handleTableSorting }) => {
  const navigate = useNavigate();

  const tableHeaderOptions = [
    {text: "Prioridade", type: SortTableTypes.priority},
    {text: "Título", type: SortTableTypes.title},
    {text: "Data de criação", type: SortTableTypes.createdAt},
    {text: "Status", type: SortTableTypes.status}
  ]

  return (
    <table>
      <tbody>
        <tr>
          {tableHeaderOptions.map((option, index) => (
            <th key={index} onClick={() => handleTableSorting(option.type)}>{option.text}</th>
          ))}          
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

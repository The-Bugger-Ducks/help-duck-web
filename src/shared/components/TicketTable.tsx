import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
 
import TicketComponent from "./Ticket";
import StatusTicket from "./StatusTicket";
import PriorityLevelBadge from "./PriorityLevelBadge";

import { SortTicketTableTypes, OrderByTypes } from "../constants/sortTableEnum";
import Ticket from "../interfaces/ticket.interface";
import { status } from "../types/status";

import "../styles/components/TicketList.css";

const TicketTable: React.FC<{
  tickets: Array<Ticket>,
  handleTableSorting: (type: SortTicketTableTypes, orderBy: OrderByTypes) => void,
  status: status | ""
}> = ({ tickets, handleTableSorting, status }) => {
  
  const navigate = useNavigate();

  const [headerSortTarget, setHeaderSortTarget] = useState<Element>() 
  
  const tableHeaderOptions = [
    {text: "Prioridade", type: SortTicketTableTypes.priority},
    {text: "Título", type: SortTicketTableTypes.title},
    {text: "Data de criação", type: SortTicketTableTypes.createdAt},
    {text: "Status", type: SortTicketTableTypes.status}
  ]

  useEffect(() => {
    if (headerSortTarget) {
      headerSortTarget.classList.remove("visible")
      headerSortTarget.classList.remove("order-by")
    }
  }, [status])

  function handleClickOptionSort(event: MouseEvent, sorting: SortTicketTableTypes) {
    const currentTarget = event.currentTarget;
    
    const optionAlreadySorted = currentTarget.id === headerSortTarget?.id

    const visibleStyle = currentTarget.classList.contains("visible");
    const orderByStyle = currentTarget.classList.contains("order-by"); 

    if (headerSortTarget && !optionAlreadySorted) {
      headerSortTarget.classList.remove('visible')
      headerSortTarget.classList.remove('order-by')
    }

    if (!optionAlreadySorted) {
      setHeaderSortTarget(currentTarget);
      currentTarget.classList.add('visible')
    }
    
    let orderBy = OrderByTypes.none;
    if (visibleStyle && orderByStyle){
      orderBy = OrderByTypes.none;
      currentTarget.classList.remove('visible')
      currentTarget.classList.remove('order-by')
    } else if (visibleStyle && !orderByStyle) {
      orderBy = OrderByTypes.asc;
      currentTarget.classList.add('order-by')
    } else {
      orderBy = OrderByTypes.desc;
      currentTarget.classList.add('visible')
    }
    
    handleTableSorting(sorting, orderBy)
  }

  return (
    <table>
      <tbody>
        <tr>
          {tableHeaderOptions.map((option, index) => (
            <th id={`${index}`} key={index} onClick={(event) => handleClickOptionSort(event, option.type)}>
              {option.text}
              <FaArrowUp className="th-arrow" />
            </th>
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

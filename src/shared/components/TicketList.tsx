import React, { useEffect, useState } from "react";

import SessionController from "../utils/handlers/SessionController";
import { TicketRequests } from "../utils/requests/Ticket.requests";

import { status } from "../types/status";
import Ticket from "../../shared/interfaces/ticket.interface";

import TicketTable from "./TicketTable";
import "../styles/components/TicketList.css";
import { SortTableTypes, OrderByTypes } from "../constants/sortTableEnum";

const TicketList: React.FC<{ status: status | "" }> = ({ status }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [typeTicketList, setTypeTicketList] = useState<"client" | "support" | "status">();

  const ticketRequest = new TicketRequests();
  const userInformation = SessionController.getUserInfo();

  useEffect(() => {
    if (userInformation?.role === "client") {
      getTicketListClient();
    } else if (userInformation?.role === "support") {
      getTicketPerStatus(status);
    }
  }, [status]);

  async function getTicketListClient(sorting?: string) {
    const response: { content: Ticket[] } = await ticketRequest.ticketListById(sorting);
    
    setTickets(response.content ?? []);
    setTypeTicketList("client");
  };

  async function getTicketListSupport(sorting?: string) {
    const response: { content: Ticket[] } = await ticketRequest.ticketListBySupport(sorting);

    const tickets = response.content.filter((ticket) => ticket.status === "underAnalysis");

    setTickets(tickets ?? []);
    setTypeTicketList("support");
  };

  async function getTicketPerStatus(status: status | "", sorting?: string) {
    if (status === "underAnalysis" || status === "") {
      return getTicketListSupport();
    }

    const response: { content: Ticket[] } = await ticketRequest.ticketListPerStatus(status, sorting);

    setTickets(response.content ?? []);
    setTypeTicketList("status");
  };


  function handleTableSorting(type: SortTableTypes, orderBy: OrderByTypes) {
    
    const containsOrderBy = orderBy !== OrderByTypes.none;
 
    let sort = "";
    if (containsOrderBy) {
      sort = `page=0&size=10&sort=${type},${orderBy}`
    } else {
      sort = `page=0&size=10&sort=${type}`
    }

    if (typeTicketList == "client") {
      getTicketListClient(sort)
    } else if (typeTicketList == "support") {
      getTicketListSupport(sort)
    } else {
      getTicketPerStatus(status, sort)
    }    
  }

  return (
    <section className="ticket-list-container">
      <div className="grid-tickets">
        <TicketTable tickets={tickets} handleTableSorting={handleTableSorting} />
      </div>
    </section>
  );
};

export default TicketList;

import React, { useEffect, useState } from "react";

import SessionController from "../utils/handlers/SessionController";
import { TicketRequests } from "../utils/requests/Ticket.requests";

import { status } from "../types/status";
import Ticket from "../../shared/interfaces/ticket.interface";

import TicketTable from "./TicketTable";
import "../styles/components/TicketList.css";

const TicketList: React.FC<{ status: status | "" }> = ({ status }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const ticketRequest = new TicketRequests();
  const userInformation = SessionController.getUserInfo();

  useEffect(() => {
    if (userInformation?.role === "client") {
      getTicketListClient();
    } else if (userInformation?.role === "support") {
      getTicketPerStatus(status);
    }
  }, [status]);

  const getTicketListClient = async () => {
    const response: { content: Ticket[] } =
      await ticketRequest.ticketListById();
    setTickets(response.content ?? []);
  };

  const getTicketListSupport = async () => {
    const response: { content: Ticket[] } =
      await ticketRequest.ticketListBySupport();

    const tickets = response.content.filter(
      (ticket) => ticket.status === "underAnalysis"
    );

    setTickets(tickets ?? []);
  };

  const getTicketPerStatus = async (status: status | "") => {
    if (status === "underAnalysis" || status === "")
      return getTicketListSupport();

    const response: { content: Ticket[] } =
      await ticketRequest.ticketListPerStatus(status);

    setTickets(response.content ?? []);
  };

  return (
    <section className="ticket-list-container">
      <div className="grid-tickets">
        <TicketTable tickets={tickets} />
      </div>
    </section>
  );
};

export default TicketList;

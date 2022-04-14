import React, { useEffect, useState } from "react";

import TicketTable from "./TicketTable";

import Ticket from "../../shared/interfaces/ticket.interface";

import { TicketRequests } from "../utils/requests/Ticket.requests";
import SessionController from "../utils/handlers/SessionController";

import "../styles/components/TicketList.css";

type status = "underAnalysis" | "awaiting" | "done";

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const ticketRequest = new TicketRequests();
  const userInformation = SessionController.getUserInfo();

  useEffect(() => {
    if (userInformation?.role === "client") {
      getTicketListClient();
    } else if (userInformation?.role === "support") {
      getTicketListSupport();
    }
  }, []);

  const handleTabSelected = (
    event: React.MouseEvent<HTMLButtonElement>,
    status: status
  ) => {
    if (event.currentTarget.classList.contains("active")) return;

    const navLinksEl = document.querySelectorAll(".nav-link");

    navLinksEl.forEach((navItem) => {
      navItem.classList.remove("active");
    });

    event.currentTarget.classList.add("active");
    getTicketPerStatus(status);
  };

  const getTicketListClient = async () => {
    const response: { content: Ticket[] } =
      await ticketRequest.ticketListById();
    setTickets(response.content ?? []);
  };

  const getTicketListSupport = async () => {
    const response: { content: Ticket[] } =
      await ticketRequest.ticketListBySupport();

    setTickets(response.content ?? []);
  };

  const getTicketPerStatus = async (status: status) => {
    if (status === "underAnalysis") return getTicketListSupport();

    const response: { content: Ticket[] } =
      await ticketRequest.ticketListPerStatus(status);

    setTickets(response.content ?? []);
  };

  return (
    <section className="ticket-list-container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className="nav-link active"
            onClick={(event) => handleTabSelected(event, "underAnalysis")}
            type="button"
          >
            Em análise
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            onClick={(event) => handleTabSelected(event, "awaiting")}
            type="button"
          >
            Abertos
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            onClick={(event) => handleTabSelected(event, "done")}
            type="button"
          >
            Fechados
          </button>
        </li>
      </ul>
      <div className="grid-tickets">
        <TicketTable tickets={tickets} />
      </div>
    </section>
  );
};

export default TicketList;

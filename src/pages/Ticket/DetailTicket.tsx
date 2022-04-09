import React, { useEffect, useState } from "react";

import { FiClock, FiFlag, FiArrowLeft } from "react-icons/fi";

import { useParams } from "react-router-dom";

import Button from "../../shared/components/Button";
import Container from "../../shared/components/Container";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import PriorityLevelBadge from "../../shared/components/PriorityLevelBadge";
import Ticket from "../../shared/interfaces/ticket.interface";
import { TicketRequests } from "../../shared/utils/requests/Ticket.requests";

import "../../shared/styles/pages/ticket/DetailTicket.css";

export default function DetailTicket() {
  const [ticket, setTicket] = useState<Ticket>();
  const [createdAt, setCreatedAt] = useState<Date>();

  const { id } = useParams();
  const ticketRequest = new TicketRequests();

  useEffect(() => {
    getTicket();
  }, []);

  const getTicket = async () => {
    const response: Ticket = await ticketRequest.showRequest(id ?? "");

    setTicket(response);
    const date = new Date(response.createdAt);
    setCreatedAt(date);
  };

  const StatusTicket: React.FC<{ status: string | undefined }> = ({
    status,
  }) => {
    const ticketDone = {
      label: "Resolvido",
      color: "var(--color-green)",
    };

    const ticketUnderAnalysis = {
      label: "Em análise",
      color: "var(--color-yellow)",
    };

    const ticketWaiting = {
      label: "Aguardando",
      color: "var(--color-yellow)",
    };

    const ticketNotSolved = {
      label: "Não resolvido",
      color: "var(--color-red)",
    };

    const ticketStatus =
      status === "underAnalysis"
        ? ticketUnderAnalysis
        : status === "waiting"
        ? ticketWaiting
        : status === "notSolved"
        ? ticketNotSolved
        : ticketDone;

    return (
      <span style={{ color: ticketStatus.color }}>
        <FiFlag color={ticketStatus.color} size="0.8rem" /> {ticketStatus.label}
      </span>
    );
  };

  return (
    <Container>
      <Header />
      <main id="detail-ticket">
        <section className="ticket-about">
          <FiArrowLeft color="var(--color-gray-dark)" />
          <h1 className="ticket-name">{ticket?.title ?? "Carregando..."}</h1>

          <p>Protocólo: #{ticket?.id ?? "..."}</p>
          <p>
            <span className="detail-date-created">
              <FiClock color="var(--color-gray-dark)" size="0.8rem" />{" "}
              {createdAt?.toLocaleString("pt-br") ?? "..."}
            </span>
            <StatusTicket status={ticket?.status} />
          </p>
        </section>

        <section className="ticket-priority">
          <h3>Grau de prioridade:</h3>
          <PriorityLevelBadge priority={ticket?.priorityLevel} />
        </section>

        <section>
          <h3>Descrição do problema:</h3>
          <div>
            <p className="description-block">{ticket?.description ?? "..."}</p>
          </div>
        </section>

        <section>
          <h3>Descrição da solução:</h3>
          <div>
            <textarea
              className="description-block"
              id="description-solution"
              disabled
            />
          </div>
        </section>

        <section className="ticket-resolve-content">
          <h3>A resolução adicionada pelo suporte foi útil?</h3>
          <div>
            <Button
              backgroundColor="var(--color-red)"
              color="#FFFFFF"
              width="7rem"
              height="2rem"
            >
              Não
            </Button>
            <Button
              backgroundColor="var(--color-green)"
              color="#FFFFFF"
              width="7rem"
              height="2rem"
            >
              Sim
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </Container>
  );
}

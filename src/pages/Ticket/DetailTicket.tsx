import React from "react";
import Badge from "../../shared/components/Badge";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";

import "../../shared/styles/pages/ticket/DetailTicket.css";

export default function DetailTicket() {
  const StatusTicket: React.FC<{ status: string }> = ({ status }) => {
    const label =
      status === "underAnalysis"
        ? "Em análise"
        : status === "waiting"
        ? "Aguardando"
        : status === "notSolved"
        ? "Não resolvido"
        : "Resolvido";

    return <span className={status}>{label}</span>;
  };

  return (
    <>
      <Header />
      <main id="detail-ticket">
        <section className="detail-page-title">
          <h2>Detalhes do chamado</h2>

          <p>
            <span className="detail-date-created">24/03/2022</span>
            <StatusTicket status="underAnalysis"></StatusTicket>
          </p>
        </section>

        <section className="ticket-about">
          <h3>Título:</h3>
          <span className="ticket-name">#ID: Titulo da chamado</span>
        </section>

        <section className="ticket-priority">
          <h3>Grau de prioridade:</h3>
          <Badge
            label="Alta"
            border="1px solid var(--color-red)"
            color="var(--color-red)"
          />
        </section>

        <section>
          <h3>Descrição do problema:</h3>
          <div>
            Texto Texto Texto Texto Texto Texto Texto Texto TextoTexto Texto
            Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto
            TextoTexto Texto Texto Texto Texto Texto Texto Texto Texto Texto
            Texto Texto TextoTexto Texto Texto Texto Texto Texto Texto Texto
            Texto Texto Texto Texto TextoTexto Texto Texto Texto Texto Texto
            Texto Texto Texto Texto Texto Texto TextoTexto Texto Texto Texto.
          </div>
        </section>

        <section>
          <h3>Descrição da solução:</h3>
          <div>
            Texto Texto Texto Texto Texto Texto Texto Texto TextoTexto Texto
            Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto
            TextoTexto Texto Texto Texto Texto Texto Texto Texto Texto Texto
            Texto Texto TextoTexto Texto Texto Texto Texto Texto Texto Texto
            Texto Texto Texto Texto TextoTexto Texto Texto Texto Texto Texto
            Texto Texto Texto Texto Texto Texto TextoTexto Texto Texto Texto.
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
    </>
  );
}

import React from "react";

import { FiClock, FiFlag, FiArrowLeft } from "react-icons/fi";

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

    return (
      <span className={status}>
        <FiFlag color="var(--color-gray-dark)" size="0.8rem" /> {label}
      </span>
    );
  };

  const textMocked = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis excepturi autem quasi, est enim distinctio asperiores! Maiores iusto a quia ipsam quas omnis velit adipisci obcaecati quidem, aut tempore facilis?
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis excepturi autem quasi, est enim distinctio asperiores! Maiores iusto a quia ipsam quas omnis velit adipisci obcaecati quidem, aut tempore facilis?
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis excepturi autem quasi, est enim distinctio asperiores! Maiores iusto a quia ipsam quas omnis velit adipisci obcaecati quidem, aut tempore facilis?
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis excepturi autem quasi, est enim distinctio asperiores! Maiores iusto a quia ipsam quas omnis velit adipisci obcaecati quidem, aut tempore facilis?
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis excepturi autem quasi, est enim distinctio asperiores! Maiores iusto a quia ipsam quas omnis velit adipisci obcaecati quidem, aut tempore facilis?
  `;

  return (
    <div id="detail-ticket-page">
      <Header />
      <main id="detail-ticket">
        <section className="ticket-about">
          <FiArrowLeft color="var(--color-gray-dark)" />
          <h3 className="ticket-name">Mouse Quebrado</h3>

          <p>Protocólo: #5533123</p>
          <p>
            <span className="detail-date-created">
              <FiClock color="var(--color-gray-dark)" size="0.8rem" />{" "}
              24/03/2022
            </span>
            <StatusTicket status="underAnalysis" />
          </p>
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
            <p className="description-block">{textMocked}</p>
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
    </div>
  );
}

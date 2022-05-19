import React, { useEffect, useState, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { FiClock, FiArrowLeft } from "react-icons/fi";

import SessionController from "../../shared/utils/handlers/SessionController";

import { CreateSolution } from "../../shared/interfaces/solution.interface";
import { SolutionRequests } from "../../shared/utils/requests/Solution.requests";
import { status } from "../../shared/types/status";
import { TicketRequests } from "../../shared/utils/requests/Ticket.requests";

import Button from "../../shared/components/Button";
import Comment from "../../shared/interfaces/comment.interface";
import Container from "../../shared/components/Container";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import PriorityLevelBadge from "../../shared/components/PriorityLevelBadge";
import StatusTicket from "../../shared/components/StatusTicket";
import Ticket from "../../shared/interfaces/ticket.interface";
import TicketComment from "../../shared/components/TicketComment";
import TicketAddComment from "../../shared/components/TicketAddComment";
import TextField from "../../shared/components/TextField";
import TicketSolution from "../../shared/components/TicketSolution";

import "../../shared/styles/pages/ticket/DetailTicket.css";

export default function DetailTicket() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = SessionController.getUserInfo();

  const formCommentRef = useRef({
    submit: () => {
      return { newComment: "" };
    },
  });

  const [ticket, setTicket] = useState<Ticket>();
  const [status, setStatus] = useState<status>();
  const [priorityLevel, setPriorityLevel] =
    useState<Ticket["priorityLevel"]>("low");
  const [problemType, setProblemType] = useState<Ticket["tags"]>([""]);
  const [ticketDepartment, setTicketDepartment] =
    useState<Ticket["department"]>("");
  const [ticketEquipment, setTicketEquipment] =
    useState<Ticket["equipment"]>("");
  const [comments, setComments] = useState<Ticket["comments"]>([]);
  const [createdAt, setCreatedAt] = useState<Date>();
  const [hasSupport, setHasSupport] = useState<boolean>(false);
  const [solution, setSolution] = useState<Ticket["solution"]>();
  const [canSetSolution, setCanSetSolution] = useState<boolean>(false);

  const ticketRequest = new TicketRequests();
  const solutionRequest = new SolutionRequests();

  useEffect(() => {
    const subscribe = getTicket();

    return () => {
      subscribe.finally();
    };
  }, []);

  async function getTicket() {
    const response: Ticket = await ticketRequest.showRequest(id ?? "");

    setTicket(response);
    setComments(response.comments);
    setStatus(response.status);
    setPriorityLevel(response.priorityLevel);
    setProblemType(response.tags);
    setSolution(response.solution);
    setTicketDepartment(response.department);
    setTicketEquipment(response.equipment);

    if (response.support && !response.solution && user?.role === "support") {
      setCanSetSolution(true);
    }

    if (response.support) setHasSupport(true);

    const date = new Date(response.createdAt);
    setCreatedAt(date);
  }

  async function handleSubmitComment() {
    let { newComment } = formCommentRef.current.submit();

    if (!user || !id) return alert("Não foi possível inserir comentário");

    const comment: Comment = {
      comment: newComment,
      ownerComment: user,
    };

    try {
      const response = await ticketRequest.insertComment(id, comment);

      if (response?.status === 200) {
        setComments((prevState) => {
          return [...prevState, comment];
        });
      }
    } catch (error) {}
  }

  async function handleReservedTicket() {
    if (user?.role !== "support") {
      return alert("Usuário sem permissão para realizar essa ação.");
    }

    const response = await ticketRequest.reserveTicket(id ?? "", user);

    if (response?.status === 200) {
      alert("Chamado reservado");
      setTicket((prevState) => {
        if (!prevState) return;
        return {
          ...prevState,
          support: user,
        };
      });
      setStatus("underAnalysis");
      setHasSupport(true);
      setCanSetSolution(true);
    }
  }

  async function handleCloseTicket() {
    if (user?.role !== "support") {
      return alert("Usuário sem permissão para relalizar essa ação.");
    }

    const response = await ticketRequest.closeTicket(id ?? "");

    if (response?.status === 200) {
      alert("Chamado fechado com sucesso!");
      setStatus("done");
      navigate("/homepage");
    }
  }

  async function handleSetSolution(comment: Comment) {
    if (!ticket) return;

    const payload: CreateSolution = {
      ticketId: ticket.id,
      titleProblem: ticket.title,
      problemTags: ticket.tags,
      solutionComment: comment,
    };

    try {
      const response = await solutionRequest.setSolutionTicket(payload);

      setSolution(response);
      setCanSetSolution(false);
    } catch (error) {
      setCanSetSolution(true);
    }
  }

  return (
    <Container>
      <Header hiddenDropdown={false} />
      <main id="detail-ticket">
        <section className="ticket-about">
          <div>
            <FiArrowLeft
              className="navigation-button"
              color="var(--color-gray-dark)"
              onClick={() => {
                navigate("/homepage");
              }}
            />
            <h1 className="ticket-name">{ticket?.title ?? "Carregando..."}</h1>

            <p>Protocólo: #{ticket?.id ?? "..."}</p>
            <p>
              <span className="detail-date-created">
                <FiClock color="var(--color-gray-dark)" size="0.8rem" />{" "}
                {createdAt?.toLocaleString("pt-br") ?? "..."}
              </span>
              <StatusTicket status={ticket?.status} />
            </p>
            <p>
              Responsável:{" "}
              {ticket?.support
                ? ticket?.support.firstName
                : "Sem responsável no momento"}{" "}
              {ticket?.support ? ticket?.support.lastName : ""}{" "}
              {ticket?.support ? `(${ticket?.support.email})` : ""}
            </p>
          </div>
          {user?.role === "support" ? (
            <div className="button-container">
              {!hasSupport ? (
                <Button
                  color="var(--color-black-dark)"
                  backgroundColor="transparent"
                  width="12rem"
                  height="2rem"
                  fontSize="0.8rem"
                  fontWeight="600"
                  border="1px solid var(--color-black-main)"
                  onClick={handleReservedTicket}
                >
                  Reservar chamado
                </Button>
              ) : (
                <>
                  {status === "underAnalysis" &&
                  comments.length > 0 &&
                  user.id === ticket?.support?.id ? (
                    <Button
                      backgroundColor="var(--color-green)"
                      color="var(--color-white-light)"
                      width="12rem"
                      height="2rem"
                      fontSize="0.8rem"
                      fontWeight="600"
                      border="1px solid var(--color-black-main)"
                      onClick={handleCloseTicket}
                    >
                      Fechar chamado
                    </Button>
                  ) : null}
                </>
              )}
            </div>
          ) : null}
        </section>

        <section className="ticket-dual-info">
          <div className="ticket-priority">
            <h3>Grau de prioridade:</h3>
            <PriorityLevelBadge priority={priorityLevel} />
          </div>

          <div className="ticket-type">
            <h3>Tipo de problema:</h3>
            <TextField
              type="text"
              placeholder={
                problemType != null && problemType[0] != ""
                  ? problemType[0]
                  : "Sem tipo definido"
              }
              disabled={true}
              name="tipo"
              backgroundColor="#FAFAFA"
              height="32px"
            />
          </div>
        </section>

        <section className="department-and-equipment">
          <article>
            <h3>Departamento:</h3>
            <TextField
              title={
                ticketDepartment != null && ticketDepartment != ""
                  ? ticketDepartment
                  : "Sem equipamento definido"
              }
              type="text"
              placeholder={
                ticketDepartment != null && ticketDepartment != ""
                  ? ticketDepartment
                  : "Sem departamento definido"
              }
              disabled={true}
              name="tipo"
              backgroundColor="#FAFAFA"
              height="32px"
            />
          </article>

          <article>
            <h3>Equipamento:</h3>
            <TextField
              title={
                ticketEquipment != null && ticketEquipment != ""
                  ? ticketEquipment
                  : "Sem equipamento definido"
              }
              type="text"
              placeholder={
                ticketEquipment != null && ticketEquipment != ""
                  ? ticketEquipment
                  : "Sem equipamento definido"
              }
              disabled={true}
              name="tipo"
              backgroundColor="#FAFAFA"
              height="32px"
            />
          </article>
        </section>

        <section>
          <h3>Descrição do problema:</h3>
          <div className="description-problem">
            <p>{ticket?.description ?? "..."}</p>
            <p className="owner-comment">{ticket?.user.email}</p>
          </div>
        </section>

        {solution ? <TicketSolution solution={solution} /> : null}

        {comments.length !== 0 ? (
          <section>
            <h3>Discussão</h3>
            <ul className="comments-block">
              {comments.map((comment, index) => (
                <TicketComment
                  key={index}
                  commentData={comment}
                  canSetSolution={canSetSolution}
                  handleSetSolution={handleSetSolution}
                />
              ))}
            </ul>
          </section>
        ) : null}

        {status === "done" ||
        (user?.role === "support" && !hasSupport) ? null : (
          <section id="add-comment-container">
            <TicketAddComment ref={formCommentRef} />
            <div className="button-container">
              <Button
                backgroundColor="transparent"
                color="var(--color-black-dark)"
                width="4rem"
                height="2rem"
                fontSize="0.8rem"
                fontWeight="600"
                border="1px solid var(--color-black-main)"
                onClick={handleSubmitComment}
              >
                Enviar
              </Button>
            </div>
          </section>
        )}

        {/* Removido temporáriamente por falta de definição */}
        {/* <section className="ticket-resolve-content">
          <h3>A resolução adicionada pelo suporte foi útil?</h3>
          <div>
            <Button
              backgroundColor="var(--color-green)"
              color="#FFFFFF"
              width="7rem"
              height="2rem"
            >
              Sim
            </Button>
            <Button
              backgroundColor="var(--color-red)"
              color="#FFFFFF"
              width="7rem"
              height="2rem"
            >
              Não
            </Button>
          </div>
        </section> */}
      </main>
      <Footer />
    </Container>
  );
}

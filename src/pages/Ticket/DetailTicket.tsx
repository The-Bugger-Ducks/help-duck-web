import React, { useEffect, useState, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { FiClock, FiArrowLeft, FiCheck, FiEdit2 } from "react-icons/fi";

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
import LoadingContainer from "../../shared/components/Loading/LoadingContainer";
import SelectInput from "../../shared/components/ChoiceField";

import "../../shared/styles/pages/ticket/DetailTicket.css";
import SolutionsList from "../../shared/components/SolutionsList";
import { ProblemRequests } from "../../shared/utils/requests/Problem.requests";


export default function DetailTicket() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = SessionController.getUserInfo();

  const formCommentRef = useRef({
    submit: () => {
      return { newComment: "" };
    },
  });

  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<Ticket>();
  const [status, setStatus] = useState<status>();
  const [priorityLevel, setPriorityLevel] =
    useState<Ticket["priorityLevel"]>("low");
  const [problemType, setProblemType] = useState<Ticket["problem"]>();
  useState<Ticket["priorityLevel"]>("low");
  const [priorityLevelSelected, setPriorityLevelSelected] =
    useState<Ticket["priorityLevel"]>("low");
  const [ticketDepartment, setTicketDepartment] =
    useState<Ticket["department"]>("");
  const [ticketEquipment, setTicketEquipment] = useState<Ticket["equipment"]>();
  const [comments, setComments] = useState<Ticket["comments"]>([]);
  const [createdAt, setCreatedAt] = useState<Date>();
  const [concludedAt, setConcludedAt] = useState<Date>();
  const [hasSupport, setHasSupport] = useState<boolean>(false);
  const [solution, setSolution] = useState<Ticket["solution"]>();
  const [canSetSolution, setCanSetSolution] = useState<boolean>(false);
  const [hiddenSolutionVote, setHiddenSolutionVote] = useState(false);
  const [editPriority, setEditPriority] = useState(false);

  const ticketRequest = new TicketRequests();
  const solutionRequest = new SolutionRequests();
  const problemRequest = new ProblemRequests();

  const ticketPriorityAux = [
    { value: "low", label: "Baixa", selected: false },
    { value: "medium", label: "Média", selected: false },
    { value: "high", label: "Alta", selected: false },
  ];

  useEffect(() => {
    const subscribe = getTicket();

    return () => {
      subscribe.finally();
    };
  }, []);

  async function getTicket() {
    setLoading(true);
    const response: Ticket = await ticketRequest.showRequest(id ?? "");

    console.log(response);

    setTicket(response);
    setComments(response.comments);
    setStatus(response.status);
    setPriorityLevel(response.priorityLevel);
    setProblemType(response.problem);
    setSolution(response.solution);
    setTicketDepartment(response.department);
    setTicketEquipment(response.equipment);

    if (response.support && !response.solution && user?.role === "support") {
      setCanSetSolution(true);
    }

    if (response.support) setHasSupport(true);

    const dateCreatedAt = new Date(response.createdAt);
    setCreatedAt(dateCreatedAt);

    if (response.concludedAt) {
      const dateConcludedAt = new Date(response.concludedAt);
      setConcludedAt(dateConcludedAt);
    }

    setLoading(false);
  }

  async function handleSubmitComment() {
    let { newComment } = formCommentRef.current.submit();

    if (!user || !id) return alert("Não foi possível inserir comentário");

    const comment: Comment = {
      comment: newComment,
      ownerComment: user,
    };

    try {
      setLoading(true);
      const response = await ticketRequest.insertComment(id, comment);

      if (response?.status === 200) {
        setComments((prevState) => {
          return [...prevState, comment];
        });
      }
    } catch (error) {
      // tratar erros
    } finally {
      setLoading(false);
    }
  }

  async function handleReservedTicket() {
    if (user?.role !== "support") {
      return alert("Usuário sem permissão para realizar essa ação.");
    }

    setLoading(true);
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
    setLoading(false);
  }

  async function handleCloseTicket() {
    if (user?.role !== "support") {
      return alert("Usuário sem permissão para realizar essa ação.");
    }

    setLoading(true);
    const response = await ticketRequest.closeTicket(id ?? "");

    if (response?.status === 200) {
      alert("Chamado fechado com sucesso!");
      setStatus("done");
      navigate("/homepage");
    }
    setLoading(false);
  }

  async function handleChangePriorityLevel() {
    if (user && user.role !== "support") {
      return;
    }

    if (!ticket) {
      return;
    }

    const payload = {
      id: ticket.id,
      priorityLevel: priorityLevelSelected,
    };

    try {
      setLoading(true);
      await ticketRequest.updatePriorityLevel(payload);
      setLoading(false);
      setPriorityLevel(priorityLevelSelected);
      setEditPriority(false);
      alert("Prioridade do chamado alterado com sucesso.");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function HandlePriorityLevel() {
    return (
      <>
        {editPriority ? (
          <>
            <SelectInput
              onChange={(event) => setPriorityLevelSelected(event.target.value)}
              items={ticketPriorityAux}
            />
            <FiCheck
              viewBox="0 0 24 78"
              className="save-priority-button"
              color="var(--color-gray-dark)"
              onClick={() => {handleChangePriorityLevel()}}
            />
          </>
        ) : (
          <>
            <PriorityLevelBadge 
              className="edit-priority-badge"
              priority={priorityLevel}
            />
            {user && user.role === "support" ?
              <FiEdit2
                viewBox="0 0 24 28"
                className="edit-priority-button"
                color="var(--color-gray-dark)"
                onClick={() => {setEditPriority(true)}}
              /> : null
            }{" "}
          </>
        )}
      </>
    )
  }

  async function handleSetSolution(comment: Comment) {
    if (!ticket) return;

    setLoading(true);

    const payload: CreateSolution = {
      ticketId: ticket.id,
      titleProblem: ticket.title,
      problem: ticket.problem,
      solutionComment: comment,
    };

    try {
      const response = await solutionRequest.setSolutionTicket(payload);

      setSolution(response);
      setCanSetSolution(false);
      setLoading(false);
    } catch (error) {
      setCanSetSolution(true);
      setLoading(false);
    }
  }

  async function handleSolutionVote(vote: boolean) {
    if (!solution) return;

    try {
      setLoading(true);
      await solutionRequest.incrementVoteSolution({
        solutionId: solution.id,
        upVote: vote,
        downVote: !vote,
      });
      setHiddenSolutionVote(true);
    } catch (error) {
      setHiddenSolutionVote(false);
    } finally {
      setLoading(false);
    }
  }

  async function handlerCreateTagSolution(title:string, description:string) {
    if(!ticket){
      return
    }
    setLoading(true)    
    await problemRequest.setSolutionProblem({title, description, problemId: ticket.problem.id})
    alert('Nova solução cadastrada com sucesso!');
    setLoading(false)   
  } 

  async function handlerSolutionDetails(){
    if(!ticket){
      return
    }
    setLoading(true)    
  }

  return (
    <>
      <LoadingContainer loading={loading} />
      <Container>
        <Header hiddenDropdown={false} />
        <main id="detail-ticket">
          <section className="detail-ticket-title">
            <h1 className="ticket-name">
              <div>
                <FiArrowLeft
                  className="navigation-button"
                  color="var(--color-gray-dark)"
                  onClick={() => {
                    navigate("/homepage");
                  }}
                />
              </div>
              {ticket?.title ?? "Carregando..."}
            </h1>
          </section>
          <section className="ticket-about">
            <div>
              <p>Protocolo: #{ticket?.id ?? "..."}</p>
              <p>
                <span className="detail-date-created">
                  <FiClock color="var(--color-gray-dark)" size="0.8rem" />{" "}
                  {createdAt?.toLocaleString("pt-br") ?? "..."}
                </span>
                <StatusTicket status={ticket?.status} />
                <span id="concludedAt">
                  <FiCheck color="var(--color-gray-dark)" size="0.8rem" />
                  {concludedAt
                    ? concludedAt.toLocaleString("pt-br")
                    : "Sem data de conclusão"}
                </span>
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
                        border="0"
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
              <HandlePriorityLevel />
            </div>

            <div className="ticket-type">
              <h3>Tipo de problema:</h3>
              <TextField
                title={
                  problemType != null && problemType.title != ""
                    ? problemType.title
                    : "Sem tipo definido"
                }
                type="text"
                placeholder={
                  problemType != null && problemType.title != ""
                    ? problemType.title
                    : "Sem tipo definido"
                }
                disabled={true}
                name="tipo"
                height="32px"
              />
            </div>
          </section>

          <section className="ticket-dual-info">
            <div className="ticket-department">
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
                height="32px"
              />
            </div>

            <div className="ticket-equipment">
              <h3>Equipamento:</h3>
              <TextField
                title={
                  ticketEquipment
                    ? ticketEquipment.name
                    : "Sem equipamento definido"
                }
                type="text"
                placeholder={
                  ticketEquipment
                    ? ticketEquipment.name
                    : "Sem equipamento definido"
                }
                disabled={true}
                name="tipo"
                height="32px"
              />
            </div>
          </section>

          <section>
            <h3>Descrição do problema</h3>
            <div className="description-problem">
              <p>{ticket?.description ?? "..."}</p>
              <p className="owner-comment">{ticket?.user.email}</p>
            </div>
          </section>

          {solution ? (
            <TicketSolution
              solution={solution}
              hiddenSolutionVote={hiddenSolutionVote}
              handleSolutionVote={handleSolutionVote}
            />
          ) : null}

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
                  color="var(--color-black-light)"
                  width="7rem"
                  height="2.6rem"
                  fontSize="0.8rem"
                  fontWeight="600"
                  radius="0.5rem"
                  border="0.1px solid var(--color-gray-dark)"
                  onClick={handleSubmitComment}
                >
                  Enviar
                </Button>
              </div>
            </section>
          )}
          {user?.role === 'support' && (
            <SolutionsList
              problemId={problemType?.id}
              handlerCreateTagSolution={handlerCreateTagSolution}
              handlerSolutionDetails={handlerSolutionDetails}
            />
          )}
        </main>
        <Footer />
      </Container>
    </>
  );
}

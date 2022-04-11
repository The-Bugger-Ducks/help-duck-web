import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import "../../shared/styles/pages/ticket/TicketRegister.css";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import ChoiceField from "../../shared/components/ChoiceField";

// import HandleUserFormData from "../../shared/utils/handlers/HandleUserFormData.service";
import Ticket from "../../shared/interfaces/ticket.interface";
import User from "../../shared/interfaces/user.interface";

export default function TicketRegister() {
  const [id, setId] = useState("");
  const [support, setSupport] = useState("");
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("waiting");
  const [reserved, setReserved] = useState(false);
  const [createdAt, setCreatedAt] = useState<Date>();  
  const [updatedAt, setUpdatedAt] = useState<Date>();  
  const [title, setTitle] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = false;

  const ticket: Ticket = {
    id,
    support,
    tags,
    status,
    reserved,
    title,
    priorityLevel,
    description,
  };

  const ticketPriority = [
    { value: "low", label: "Prioridade baixa", selected: true },
    { value: "medium", label: "Prioridade média", selected: false },
    { value: "high", label: "Prioridade alta", selected: false },
  ];

  // let handleUserFormData = new HandleUserFormData();

  if (isAuthenticated) {
    console.log("Authenticated");
    navigate("/login");
  }

  return (
    <div id="ticket-register">
      <div className="ticket-register-container">
        <Header />
        <div className="ticket-register-content">
          <section className="ticket-register-title">
            <h1>
              <FiArrowLeft className="Icon" color="var(--color-gray-dark)" />
              Cadastro de chamado
            </h1>
          </section>
          <form className="ticket-register-form">
            <section className="form-sections">
              <section className="ticket-register-data">
                <label htmlFor="titulo">Título:</label>
                <TextField
                  placeholder="Título do chamado"
                  onChange={(event) => setTitle(event.target.value)}
                  name="titulo"
                />
                <label htmlFor="prioridade">Grau de prioridade:</label>
                <ChoiceField
                  onChange={(event) => setPriorityLevel(event.target.value)}
                  name="prioridade" 
                  items={ticketPriority}
                />
              </section> 
              <section className="ticket-register-description">
              <label htmlFor="titulo">Descrição do problema:</label>
                <TextField
                  placeholder="Descreva seu problema aqui."
                  onChange={(event) => setDescription(event.target.value)}
                  name="description"
                />
              </section>
              <section className="ticket-register-submit">
                <Button
                  type="submit"
                  width = "12rem"
                  // onClick={() => handleUserFormData.handleticket-register(user)}
                >
                  Abrir Chamado
                </Button>
              </section>  
            </section>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

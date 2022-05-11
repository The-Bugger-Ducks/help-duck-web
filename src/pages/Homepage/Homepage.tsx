import React, { useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import Button from "../../shared/components/Button";
import ChoiceField from "../../shared/components/ChoiceField";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import TicketList from "../../shared/components/TicketList";

import SessionController from "../../shared/utils/handlers/SessionController";
import UserList from "../../shared/components/UserList";
import { status } from "../../shared/types/status";

import "../../shared/styles/pages/homepage/Homepage.css";
import EquipmentList from "../../shared/components/EquipmentList";

export default function Homepage() {
  const token = SessionController.getToken();

  const navigate = useNavigate();
  const userInformation = SessionController.getUserInfo();

  const [statusFilter, setStatusFilter] = useState<status | "">("");
  const [equipmentStatusFilter, setEquipmentStatusFilter] = useState<
    status | ""
  >("");
  const [pageTitle, setPageTitle] = useState("Chamados");
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    "Buscar por título do chamado"
  );
  const [filterOptions, setFilterOptions] = useState(
    userInformation?.role === "support"
      ? [
          {
            selected: true,
            value: "underAnalysis",
            label: "Meus atendimentos",
          },
          {
            value: "awaiting",
            label: "Abertos",
          },
          {
            value: "done",
            label: "Fechados",
          },
        ]
      : [
          {
            selected: true,
            value: "",
            label: "Meus chamados",
          },
        ]
  );

  useEffect(() => {
    if (!token || !userInformation) {
      navigate("/");
    }

    if (userInformation?.role === "admin") {
      setSearchPlaceholder("Buscar pelo nome do usuário");
      setPageTitle("Usuários");
      setFilterOptions([
        {
          value: "allUsers",
          label: "Todos os usuários",
          selected: true,
        },
      ]);
    }
  }, []);

  function handleFilterTickets(event: React.FormEvent) {
    event.preventDefault();
  }

  function handleFilterEquipment(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div id="homepage">
      <Header hiddenDropdown={false} />
      <div className="homepage-container">
        <h1>{pageTitle}</h1>
        <section className="search-or-filter">
          <form className="searchTicket" onSubmit={handleFilterTickets}>
            <TextField
              placeholder={searchPlaceholder}
              name="search"
              width="75%"
              backgroundColor="#FAFAFA"
              type="text"
            />
            <Button width="20%" type="submit" fontSize="0.8rem">
              Buscar
            </Button>
          </form>
          <div className="filter">
            <ChoiceField
              name="filter"
              items={filterOptions}
              width="100%"
              backgroundColor="#FAFAFA"
              onChange={(event) => setStatusFilter(event.target.value)}
            />
          </div>
        </section>
        {userInformation?.role === "admin" ? (
          <>
            <UserList />
            <div className="btn-create-user">
              <Link to="/signup">
                <Button width="20%">Cadastrar usuário</Button>
              </Link>
            </div>

            <h1>Equipamentos</h1>

            <section className="search-or-filter">
              <form className="searchTicket" onSubmit={handleFilterEquipment}>
                <TextField
                  placeholder={"Busque por um equipamento"}
                  name="search"
                  width="75%"
                  backgroundColor="#FAFAFA"
                  type="text"
                />
                <Button width="20%" type="submit" fontSize="0.8rem">
                  Buscar
                </Button>
              </form>
              <div className="filter">
                <ChoiceField
                  name="filter"
                  items={[
                    {
                      selected: true,
                      value: "underAnalysis",
                      label: "Meus atendimentos",
                    },
                    {
                      selected: true,
                      value: "underAnalysis",
                      label: "Meus atendimentos",
                    },
                  ]}
                  width="100%"
                  backgroundColor="#FAFAFA"
                  onChange={(event) => setStatusFilter(event.target.value)}
                />
              </div>
            </section>

            <EquipmentList />

            <div className="btn-create-equipment">
              <Link to="/equipment_register">
                <Button width="20%">Cadastrar Equipamento</Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <TicketList status={statusFilter} />
            {userInformation?.role === "client" ? (
              <div className="btn-open-ticket">
                <Link to="/ticket_register">
                  <Button width="20%">Abrir chamado</Button>
                </Link>
              </div>
            ) : null}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

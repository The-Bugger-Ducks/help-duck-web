import React, { useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import Button from "../../shared/components/Button";
import ChoiceField from "../../shared/components/ChoiceField";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import TicketList from "../../shared/components/TicketList";
import UserList from "../../shared/components/UserList";
import EquipmentList from "../../shared/components/EquipmentList";

import SessionController from "../../shared/utils/handlers/SessionController";

import { status } from "../../shared/types/status";

import { getOptionListSelectPerUserRole } from "../../shared/constants/userFilterSelect";

import "../../shared/styles/pages/homepage/Homepage.css";
import { FiSearch } from "react-icons/fi";

export default function Homepage() {
  const token = SessionController.getToken();

  const navigate = useNavigate();
  const userInformation = SessionController.getUserInfo();

  const [statusFilter, setStatusFilter] = useState<status | "">("");
  const [inputSearch, setInputSearch] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [equipmentStatusFilter, setEquipmentStatusFilter] = useState<
    status | ""
  >("");
  const [pageTitle, setPageTitle] = useState("Chamados");
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    "Buscar por título do chamado"
  );
  const [filterOptions, setFilterOptions] = useState(
    getOptionListSelectPerUserRole(userInformation?.role)
  );

  useEffect(() => {
    if (!token || !userInformation) {
      navigate("/");
    }

    if (userInformation?.role === "admin") {
      setSearchPlaceholder("Buscar pelo nome do usuário");
      setPageTitle("Usuários");
    }
  }, []);

  function handleFilterTickets(event: React.FormEvent) {
    event.preventDefault();
    setSearchUsername(inputSearch);
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
              required={false}
              placeholder={searchPlaceholder}
              name="search"
              width="75%"
              backgroundColor="#FAFAFA"
              type="text"
              height="42px"
              onChange={(event) => setInputSearch(event.target.value)}
            />
            <Button width="20%" type="submit" fontSize="0.8rem">
              <FiSearch
                className="Icon"
              />
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
              height="42px"
            />
          </div>
        </section>
        {userInformation?.role === "admin" ? (
          <>
            <UserList filterUserList={statusFilter} username={searchUsername} />
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
                  height="42px"
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
                      value: "allEquipments",
                      label: "Todos os equipamentos",
                    },
                  ]}
                  width="100%"
                  backgroundColor="#FAFAFA"
                  onChange={(event) => setStatusFilter(event.target.value)}
                  height="42px"
                  color="#495057"
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
            <TicketList status={statusFilter} searchedTitle={searchUsername} />
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
      <Footer id={userInformation?.role === "admin" ? "footer-admin" : ""} />
    </div>
  );
}

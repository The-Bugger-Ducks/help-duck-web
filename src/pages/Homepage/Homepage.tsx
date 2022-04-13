import { useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import Button from "../../shared/components/Button";
import ChoiceField from "../../shared/components/ChoiceField";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import TicketList from "../../shared/components/TicketList";

import SessionController from "../../shared/utils/handlers/SessionController";

import "../../shared/styles/pages/homepage/Homepage.css";
import { userInfo } from "os";

export default function Homepage() {
  const token = SessionController.getToken();
  const user = SessionController.getUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      navigate("/");
    }
  }, []);

  return (
    <div id="homepage">
      <Header hiddenDropdown={false} />
      <div className="homepage-container">
        <h1>Chamados</h1>
        <section className="search-or-filter">
          <form className="searchTicket">
            <TextField
              placeholder="Buscar por título do chamado"
              name="search"
              width="75%"
              backgroundColor="#FAFAFA"
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
                  value: "opcao01",
                  label: "Todos os chamados",
                },
              ]}
              width="100%"
              backgroundColor="#FAFAFA"
            />
          </div>
        </section>
        <TicketList role={user?.role} />
        <div className="btn-open-ticket">
          <Link to="/ticket_register">
            <Button width="20%">Abrir chamado</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

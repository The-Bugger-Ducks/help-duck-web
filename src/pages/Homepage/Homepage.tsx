import Button from "../../shared/components/Button";
import ChoiceField from "../../shared/components/ChoiceField";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import TicketList from "../../shared/components/TicketList";
import "../../shared/styles/pages/homepage/Homepage.css";

export default function Homepage() {
  return (
    <div id="homepage">
      <Header />
      <div className="homepage-container">
        <h1>Chamados</h1>
        <section className="search-or-filter">
          <form className="searchTicket">
            <TextField
              placeholder="Buscar por título do chamado"
              name="search"
              width="75%"
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
                  selected: true,
                },
              ]}
              width="100%"
            />
          </div>
        </section>
        <TicketList />
        <div className="btn-open-ticket">
          <Button width="20%">Abrir chamado</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

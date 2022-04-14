import { status } from "../types/status";

const StatusTabs: React.FC = () => {
  const handleTabSelected = (
    event: React.MouseEvent<HTMLButtonElement>,
    status: status
  ) => {
    if (event.currentTarget.classList.contains("active")) return;

    const navLinksEl = document.querySelectorAll(".nav-link");

    navLinksEl.forEach((navItem) => {
      navItem.classList.remove("active");
    });

    event.currentTarget.classList.add("active");
  };

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <button
          className="nav-link active"
          onClick={(event) => handleTabSelected(event, "underAnalysis")}
          type="button"
        >
          Meus atendimentos
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          onClick={(event) => handleTabSelected(event, "awaiting")}
          type="button"
        >
          Abertos
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          onClick={(event) => handleTabSelected(event, "done")}
          type="button"
        >
          Fechados
        </button>
      </li>
    </ul>
  );
};

export default StatusTabs;

import "../styles/components/Header.css";
import Dropdown from "../../shared/components/Dropdown";
import SessionController from "../utils/handlers/SessionController";

interface PropsHeader {
  hiddenDropdown: boolean;
}

const Header: React.FC<PropsHeader> = ({ hiddenDropdown = false }) => {
  const userInformation = SessionController.getUserInfo();

  return (
    <header className="header">
      <h1>Help Duck</h1>
      <Dropdown
        name={`${userInformation?.firstName} ${userInformation?.lastName}`}
        hiddenDropdown={hiddenDropdown}
      />
    </header>
  );
};

export default Header;

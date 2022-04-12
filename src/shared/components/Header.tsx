import "../styles/components/Header.css";
import Dropdown from "../../shared/components/Dropdown";

interface PropsHeader {
  hiddenDropdown: boolean;
}

const Header: React.FC<PropsHeader> = ({ hiddenDropdown = false }) => {
  return (
    <header className="header">
      <h1>Help Duck</h1>
      <Dropdown name="Fulanoo" hiddenDropdown={hiddenDropdown} />
    </header>
  );
};

export default Header;

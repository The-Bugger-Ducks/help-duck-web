import "../styles/components/Header.css";
import Dropdown from "../../shared/components/Dropdown";

export default function Header() {
  return (
    <header className="header">
      <h1>Help Duck</h1>
      <Dropdown name="Fulanoo" />
    </header>
  );
}

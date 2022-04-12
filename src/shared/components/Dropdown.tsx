import React, { useState } from "react";
import "../styles/components/Dropdown.css";
import { BsChevronDown } from "react-icons/bs";

interface PropsDropdown {
  name: string;
}

const Dropdown: React.FC<PropsDropdown> = ({ name = "Fulano" }) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <div className="dropdown-container">
      <span onClick={() => setIsHidden(!isHidden)}>
        Olá, {name}{" "}
        <BsChevronDown color="var(--color-white-main)" size="0.8rem" />{" "}
      </span>
      <div className="dropdown-list-container" hidden={isHidden}>
        <ul>
          <li>Editar perfil</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;

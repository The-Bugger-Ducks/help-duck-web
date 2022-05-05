import React, { useState } from "react";
import "../styles/components/Dropdown.css";
import { BsChevronDown } from "react-icons/bs";
import SessionController from "../utils/handlers/SessionController";
import { useNavigate } from "react-router-dom";

interface PropsDropdown {
  name: string;
  hiddenDropdown: boolean;
}

const Dropdown: React.FC<PropsDropdown> = ({
  name = "Fulano",
  hiddenDropdown = true,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();

  const user = SessionController.getUserInfo();

  function editUser() {
    navigate(`../user/edit/${user?.id}/`);
  }

  function logout() {
    SessionController.clearRecords();
    navigate("/");
  }

  return (
    <div className="dropdown-container" hidden={hiddenDropdown}>
      <span onClick={() => setIsHidden(!isHidden)}>
        Olá, {name}{" "}
        <BsChevronDown color="var(--color-white-main)" size="0.8rem" />{" "}
      </span>
      <div className="dropdown-list-container" hidden={isHidden}>
        <ul>
          <li onClick={editUser.bind(this)}>Editar perfil</li>
          <li onClick={logout.bind(this)}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;

import React, { useEffect, useState } from "react";
import { Location, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

import SessionController from "../utils/handlers/SessionController";

import "../styles/components/Dropdown.css";

interface PropsDropdown {
  name: string;
  hiddenDropdown: boolean;
  location: Location 
}

const Dropdown: React.FC<PropsDropdown> = ({
  name = "Fulano",
  hiddenDropdown = true,
  location
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();

  const user = SessionController.getUserInfo();

  useEffect(() => {
    console.log(location);
    
  }, [])

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
        <p id="name-span">Olá, {name} </p>
        <BsChevronDown color="var(--color-white-main)" size="0.8rem" />{" "}
      </span>
      <div className="dropdown-list-container" hidden={isHidden}>
        <ul>
          {!location.pathname.includes("/user/edit/") ? 
            <li onClick={() => editUser()}>Editar perfil</li> : null
          }
          {user?.role == "admin" && !location.pathname.includes("/dashboard") ? (
            <li onClick={() => navigate('/dashboard')}>Relatórios</li>
          ):null}
          <li onClick={() => logout()}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;

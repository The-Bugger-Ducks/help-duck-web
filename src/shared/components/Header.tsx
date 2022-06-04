import { useNavigate } from 'react-router-dom';

import Dropdown from "../../shared/components/Dropdown";

import SessionController from "../utils/handlers/SessionController";

import "../styles/components/Header.css";

interface PropsHeader {
  hiddenDropdown: boolean;
}

const Header: React.FC<PropsHeader> = ({ hiddenDropdown = false }) => {
  const navigate = useNavigate()

  const userInformation = SessionController.getUserInfo();

  return (
    <header className="header">
      <h1 onClick={() => navigate('/')} style={{cursor: 'pointer'}}>Help Duck</h1>
      <Dropdown
        name={`${userInformation?.firstName} ${userInformation?.lastName}`}
        hiddenDropdown={hiddenDropdown}
      />
    </header>
  );
};

export default Header;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../shared/styles/pages/login/Signup.css";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import ChoiceField from "../../shared/components/ChoiceField";

// import HandleUserFormData from "../../shared/utils/handlers/HandleUserFormData.service";
import User from "../../shared/interfaces/user.interface";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [profileType, setProfileType] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = false;

  const user: User = {
    email,
    password,
    firstName: name,
    lastName: lastname,
    profileType,
  };

  const userProfiles = [
    { value: "client", label: "Cliente", selected: true },
    { value: "support", label: "Suporte", selected: false },
    { value: "admin", label: "Administrador", selected: false },
  ];

  // let handleUserFormData = new HandleUserFormData();

  if (isAuthenticated) {
    console.log("Authenticated");
    navigate("/login");
  }

  return (
    <div id="signup">
      <div className="signup-container">
        <Header hiddenDropdown={true} />
        <div className="signup-content">
          <section className="signup-welcome">
            <h2>Bem vindo(a)!</h2>
            <h1>Cadastre a conta</h1>
          </section>
          <form className="signup-form">
            <section className="form-sections">
              <section className="signup-data">
                <label htmlFor="name">Nome</label>
                <TextField
                  placeholder="John"
                  onChange={(event) => setName(event.target.value)}
                  name="name"
                />
                <label htmlFor="lastname">Sobrenome</label>
                <TextField
                  placeholder="Snow"
                  onChange={(event) => setLastname(event.target.value)}
                  name="lastname"
                />
              </section>
              <section className="signup-data">
                <label htmlFor="email">E-mail</label>
                <TextField
                  placeholder="john.snow@email.com"
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                />
                <label htmlFor="password">Senha</label>
                <TextField
                  placeholder="Senha"
                  onChange={(event) => setPassword(event.target.value)}
                  name="password"
                  type="password"
                />
              </section>
            </section>
            <section className="signup-data-line">
              <section className="signup-data">
                <ChoiceField
                  onChange={(event) => setProfileType(event.target.value)}
                  name="profile_type"
                  items={userProfiles}
                />
              </section>
              <section className="signup-data">
                <Button
                  width="100%"
                  type="submit"
                  // onClick={() => handleUserFormData.handlesignup(user)}
                >
                  Cadastrar
                </Button>
              </section>
            </section>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

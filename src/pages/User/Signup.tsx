import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserRequests } from "../../shared/utils/requests/User.requests";
import { FiArrowLeft } from "react-icons/fi";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import ChoiceField from "../../shared/components/ChoiceField";

import SessionController from "../../shared/utils/handlers/SessionController";
import "../../shared/styles/pages/user/Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState<"admin" | "support" | "client">("client");

  const userRequest = new UserRequests();

  const navigate = useNavigate();

  const userProfiles = [
    { value: "client", label: "Cliente", selected: false },
    { value: "support", label: "Suporte", selected: false },
    { value: "admin", label: "Administrador", selected: false },
  ];

  const token = SessionController.getToken();
  const user = SessionController.getUserInfo();

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      navigate("/");
    }
  }, []);

  async function submitSignup(event: FormEvent) {
    event.preventDefault();
    if (email === "" || password === "" || name === "" || lastname === "") {
      return alert("Preencha todos os campos");
    }

    const payload = {
      email: email,
      password: password,
      firstName: name,
      lastName: lastname,
      role: role,
    };
    console.log(payload);

    const response = await userRequest.registerRequest(payload);

    if (response?.status === 201) {
      alert("Usuário cadastrado com sucesso!");

      navigate("/homepage");
    }
  }

  return (
    <div id="signup">
      <div className="signup-container">
        <Header hiddenDropdown={true} />
        <div className="signup-content">
          <section className="signup-welcome">
            <h2>
              <FiArrowLeft
                color="var(--color-withe-main)"
                onClick={() => {
                  navigate("/homepage");
                }}
              />
            </h2>
            <h1>Cadastre a conta</h1>
          </section>
          <form className="signup-form" onSubmit={submitSignup}>
            <section className="form-sections">
              <section className="signup-data">
                <label htmlFor="name">Nome</label>
                <TextField
                  type="text"
                  placeholder="John"
                  onChange={(event) => setName(event.target.value)}
                  name="name"
                />
                <label htmlFor="lastname">Sobrenome</label>
                <TextField
                  type="text"
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
                  onChange={(event) => setRole(event.target.value)}
                  name="profile_type"
                  items={userProfiles}
                />
              </section>
              <section className="signup-data">
                <Button width="100%" type="submit">
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

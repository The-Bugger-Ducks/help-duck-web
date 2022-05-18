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
          <section className="signup-title">
            <h1>
              <div>
                <FiArrowLeft
                  className="Icon"
                  color="var(--color-gray-dark)"
                  onClick={() => {
                    navigate("/homepage");
                  }}
                />
              </div>
              Cadastre a conta
            </h1>
          </section>
          <form className="signup-form" onSubmit={submitSignup}>
            <section className="form-sections">
              <section className="signup-data">
                <div>
                  <label htmlFor="name">Nome</label>
                  <TextField
                    type="text"
                    placeholder="John"
                    onChange={(event) => setName(event.target.value)}
                    name="name"
                  />
                </div>
                <div>
                  <label htmlFor="lastname">Sobrenome</label>
                  <TextField
                    type="text"
                    placeholder="Snow"
                    onChange={(event) => setLastname(event.target.value)}
                    name="lastname"
                  />
                </div>
              </section>

              <section className="signup-data">
                <div>
                  <label htmlFor="email">E-mail</label>
                  <TextField
                    placeholder="john.snow@email.com"
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                  />
                </div>
                <div>
                  <label htmlFor="password">Senha</label>
                  <TextField
                    placeholder="Senha"
                    onChange={(event) => setPassword(event.target.value)}
                    name="password"
                    type="password"
                  />
                </div>
              </section>

              <section className="signup-data">
                <div>
                  <ChoiceField
                    onChange={(event) => setRole(event.target.value)}
                    name="role"
                    items={userProfiles}
                    />
                </div>
              </section>
            </section>

            <section className="signup-submit">
              <Button width="15rem" type="submit" color="var(--color-white-light)">
                Cadastrar
              </Button>
            </section>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

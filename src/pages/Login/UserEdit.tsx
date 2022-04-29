import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserRequests } from "../../shared/utils/requests/User.requests";
import { FiArrowLeft } from "react-icons/fi";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";

import SessionController from "../../shared/utils/handlers/SessionController";
import "../../shared/styles/pages/login/UserEdit.css";

export default function UserEdit() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState<"admin" | "support" | "client">("client");

  const userRequest = new UserRequests();

  const navigate = useNavigate();


  const token = SessionController.getToken();
  const user = SessionController.getUserInfo();

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      navigate("/");
    }
  }, []);

  async function submitUserEdit(event: FormEvent) {
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

    const response = await userRequest.updateRequest(payload);

    if (response?.status === 201) {
      alert("Usuário cadastrado com sucesso!");

      navigate("/homepage");
    }
  }

  return (
    <div id="userEdit">
      <div className="userEdit-container">
        <Header hiddenDropdown={true} />
        <div className="userEdit-content">
          <section className="userEdit-welcome">
            <h2>
              <FiArrowLeft
                color="var(--color-withe-main)"
                onClick={() => {
                  navigate("/homepage");
                }}
              />
            </h2>
            <h1>Editar perfil</h1>
          </section>
          <form className="userEdit-form" onSubmit={submitUserEdit}>
            <section className="form-sections">
              <section className="userEdit-data">
                <label htmlFor="name">Nome</label>
                <TextField
                  type="text"
                  placeholder={user?.firstName}
                  onChange={(event) => setName(event.target.value)}
                  name="name"
                />
                <label htmlFor="lastname">Sobrenome</label>
                <TextField
                  type="text"
                  placeholder={user?.lastName}
                  onChange={(event) => setLastname(event.target.value)}
                  name="lastname"
                />
              </section>
              <section className="userEdit-data">
                <label htmlFor="email">E-mail</label>
                <TextField
                  placeholder={user?.email}
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
            <section className="userEdit-role">
              <label htmlFor="role">Cargo</label>
              <TextField
                onChange={(event) => setRole(event.target.value)}
                name="profile_type"
                width="20rem"
                placeholder={user?.role}
                disabled={true}
              />
            </section>
            <section className="userEdit-submit">
              <Button width="15rem" type="submit">
                Confirmar alteração
              </Button>
            </section>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

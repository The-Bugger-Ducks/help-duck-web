import { FormEvent, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { UserRequests } from "../../shared/utils/requests/User.requests";
import { FiArrowLeft } from "react-icons/fi";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import { User } from "../../shared/interfaces/user.interface";
import SessionController from "../../shared/utils/handlers/SessionController";
import "../../shared/styles/pages/user/UserEdit.css";

export default function UserEdit() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState<"admin" | "support" | "client">("client");

  const [emailPlaceholder, setEmailPlaceholder] = useState("");
  const [namePlaceholder, setNamePlaceholder] = useState("");
  const [lastnamePlaceholder, setLastNamePlaceholder] = useState("");
  const [rolePlaceholder, setRolePlaceholder] = useState<"admin" | "support" | "client">("client");
  
  // const [isDisable, setIsDisable] = useState(false);
  
  const navigate = useNavigate();
  const token = SessionController.getToken();
  const { id } = useParams();
  const user = SessionController.getUserInfo();
  
  const userRequest = new UserRequests();

  useEffect(() => {
    const subscribe = getUser();

    return () => {
      subscribe.finally();
    };
  }, []);

  const getUser = async () => {
    const response: User = await userRequest.showRequest(id ?? "");

    setEmailPlaceholder(response.email);
    setNamePlaceholder(response.firstName);
    setLastNamePlaceholder(response.lastName);
    setRolePlaceholder(response.role);

  };

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      navigate("/");
    }
  }, []
  );
    
  // if (user?.role === id) {
  //   console.log(user?.id);
  //   console.log(id);
  // } else {
  //   setIsDisable(true);
  // }

  async function submitUserEdit(event: FormEvent) {
    event.preventDefault();
    if (email === "" || password === "" || name === "" || lastname === "") {
      return alert("Preencha todos os campos");
    }

    const payload = {
      id: id,
      email: email,
      password: password,
      firstName: name,
      lastName: lastname,
      role: role,
    };
    console.log(payload);

    const response = await userRequest.updateRequest(payload);
    console.log(response)

    if (response?.status === 200) {
      alert("Usuário atualizado com sucesso!");

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
                  placeholder={namePlaceholder}
                  onChange={(event) => setName(event.target.value)}
                  name="name"
                />
                <label htmlFor="lastname">Sobrenome</label>
                <TextField
                  type="text"
                  placeholder={lastnamePlaceholder}
                  onChange={(event) => setLastname(event.target.value)}
                  name="lastname"
                />
              </section>
              <section className="userEdit-data">
                <label htmlFor="email">E-mail</label>
                <TextField
                  placeholder={emailPlaceholder}
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
                placeholder={rolePlaceholder}
                disabled={true}
                backgroundColor = "#e2e2e2"

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

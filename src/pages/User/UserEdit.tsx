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
  
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
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
    if (!token) {
      navigate("/");
    }
    if (user?.role !== "admin" && user?.id !== id) {
      navigate("/");
    }
  }, []);
  
  useEffect(() => {
    if (user?.id === id) {
      setIsAdmin(true);
      setIsUser(false);
    } else {
      setIsAdmin(false);
      setIsUser(true);
    }
  }, []);

  async function submitUserEdit(event: FormEvent) {
    event.preventDefault();
    if (user?.id === id) {
      if (password === "" || name === "" || lastname === "") {
        return alert("Preencha todos os campos habilitados");
      }
    }
    else {
      if (email === "") {
        return alert("Preencha o email");
      }
    }
    if (!id) {return}
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
      if (user?.id === id) {
        //@ts-expect-error
        delete payload.password;
        payload.role = user.role;
        SessionController.setUserInfo(payload);
      }
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
                  disabled={isUser}
                />
                <label htmlFor="lastname">Sobrenome</label>
                <TextField
                  type="text"
                  placeholder={lastnamePlaceholder}
                  onChange={(event) => setLastname(event.target.value)}
                  name="lastname"
                  disabled={isUser}
                />
              </section>
              <section className="userEdit-data">
                <label htmlFor="email">E-mail</label>
                <TextField
                  placeholder={emailPlaceholder}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  disabled={isAdmin}
                />
                <label htmlFor="password">Senha</label>
                <TextField
                  placeholder="Senha"
                  onChange={(event) => setPassword(event.target.value)}
                  name="password"
                  type="password"
                  disabled={isUser}
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

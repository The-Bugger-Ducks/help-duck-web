import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../shared/styles/pages/login/Login.css";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";

import HandleUserFormData from "../../shared/utils/handlers/HandleUserFormData.service";
import {UserLogin} from "../../shared/interfaces/user.interface";
import SessionController from "../../shared/utils/handlers/SessionController";
import { apiAuth } from "../../shared/services/Api.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user: UserLogin = {
    email,
    password,
  };

  let handleUserFormData = new HandleUserFormData();

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/homepage");
    }
  }, [isAuthenticated, navigate]);

  const authenticate = (event: any) => {
    event.preventDefault();
    try {
      handleUserFormData.handleLogin(user).then((data) => {
        SessionController.setToken(data.token);
        SessionController.setUserInfo(data.user);
        setIsAuthenticated(true);
      });
    } catch (err) {
      console.log(err);
      setIsAuthenticated(false);
    }
  };

  async function alertForgotPassword() {
    return alert("Contate um administrador para atualização de senha!");
  }

  const checkUserAuthentication = async () => {
    const token = SessionController.getToken();
    const user = SessionController.getUserInfo();

    if (!token || !user) return setIsAuthenticated(false);
    const response = await apiAuth.post(
      "/auth/authorization",
      { id: user.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return setIsAuthenticated(true);
    } else {
      return setIsAuthenticated(false);
    }
  };

  return (
    <div id="login">
      <div className="login-container">
        <Header hiddenDropdown={true} />
        <div className="login-content">
          <section className="login-welcome">
            <h2>Bem vindo(a)!</h2>
            <h1>Entre na sua conta</h1>
          </section>
          <form className="login-form" onSubmit={authenticate}>
            <section className="login-data">
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
            <Link to={"#"} id="recover-password" onClick={() => alertForgotPassword()}>
              Esqueceu a senha?
            </Link>
            <Button type="submit" width="80%">
              Entrar
            </Button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../shared/styles/pages/login/Login.css";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";

import HandleUserFormData from "../../shared/utils/handlers/HandleUserFormData.service";
import User from "../../shared/interfaces/user.interface";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = false;

  const user: User = {
    email,
    password,
  };

  let handleUserFormData = new HandleUserFormData();

  if (isAuthenticated) {
    console.log("Authenticated");
    navigate("/homepage");
  }

  return (
    <div id="login">
      <div className="login-container">
        <Header />
        <div className="login-content">
          <section className="login-welcome">
            <h2>Bem vindo(a)!</h2>
            <h1>Entre na sua conta</h1>
          </section>
          <form className="login-form">
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
            <Link to={"#"} id="recover-password">
              Esqueceu a senha?
            </Link>
            <Button
              type="submit"
              width="80%"
              onClick={() => handleUserFormData.handleLogin(user)}
            >
              Entrar
            </Button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

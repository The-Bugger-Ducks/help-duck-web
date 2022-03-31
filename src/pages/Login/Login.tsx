import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../styles/pages/Login/Login.css";

export default function Login() {
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
              <input
                type="email"
                name="email"
                className="email"
                placeholder="jhon.snow@email.com"
                required
              />

              <label htmlFor="password">Senha</label>
              <input
                type="password"
                name="password"
                className="password"
                placeholder="senha"
                required
              />
            </section>
            <span id="recover-password">Esqueceu a senha?</span>
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

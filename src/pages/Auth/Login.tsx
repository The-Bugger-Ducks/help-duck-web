import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../../shared/styles/pages/auth/Login.css";

import Button from '../../shared/components/Button';
import Footer from '../../shared/components/Footer';
import Header from '../../shared/components/Header';
import TextField from '../../shared/components/TextField';
import LoadingContainer from '../../shared/components/Loading/LoadingContainer';

import HandleUserFormData from '../../shared/utils/handlers/HandleUserFormData.service';
import { UserLogin } from '../../shared/interfaces/user.interface';
import SessionController from '../../shared/utils/handlers/SessionController';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);

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
      navigate('/homepage');
    }
  }, [isAuthenticated, navigate]);

  async function authenticate(event: FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);
      const data = await handleUserFormData.handleLogin(user)

      SessionController.setToken(data.token);
      SessionController.setUserInfo(data.user);
      
      setIsAuthenticated(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setIsAuthenticated(false);
    }
  };

  function alertForgotPassword() {
    return alert('Contate um administrador para atualização de senha!');
  }

  const checkUserAuthentication = async () => {
    const token = SessionController.getToken();

    return !token ? setIsAuthenticated(false) : setIsAuthenticated(true);
  };

  return (
    <>
      <LoadingContainer loading={loading} />
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
                  onChange={event => setEmail(event.target.value)}
                  name="email"
                />
                <label htmlFor="password">Senha</label>
                <TextField
                  placeholder="Senha"
                  onChange={event => setPassword(event.target.value)}
                  name="password"
                  type="password"
                />
              </section>
              <span id="recover-password" onClick={() => alertForgotPassword()}>
                Esqueceu a senha?
              </span>
              <Button type="submit" width="100%">
                Entrar
              </Button>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </>    
  );
}

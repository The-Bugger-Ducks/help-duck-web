import React from "react";

import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";

import SessionController from "../../shared/utils/handlers/SessionController";

import "../../shared/styles/pages/dashboard/Dashboard.css";

export default function Dashboard() {
  const token = SessionController.getToken();

  const userInformation = SessionController.getUserInfo();

  return (
    <div id="dashboard">
      <Header hiddenDropdown={false} />
      <section className="dashboard-container">
        <h1>Relatórios</h1>

        <div>
          <section>
            <h3>Chamados</h3>

            <ul>
              <li>
                <span>Aguardando</span>
                <span>15</span>
              </li>
              <li>
                <span>Em Andamento</span>
                <span>21</span>
              </li>
              <li>
                <span>Fechados</span>
                <span>31</span>
              </li>
              <li>
                <span>Total</span>
                <span>31</span>
              </li>
            </ul>
          </section>
          <section>
            <h3>Tempo médio de ações</h3>

            <ul>
              <li>
                <span>Reservar chamado</span>
                <span>3h:43min</span>
              </li>
              <li>
                <span>Fechar chamado</span>
                <span>6h:43min</span>
              </li>            
            </ul>
          </section>
        </div>

        <div>
          <section>
            <h3>Chamados por problema</h3>

            <ul>
              <li>
                <span>Acesso a rede</span>
                <span>15</span>
              </li>
              <li>
                <span>Acesso ao email</span>
                <span>21</span>
              </li>
              <li>
                <span>Uso de beneficios</span>
                <span>31</span>
              </li>
              <li>
                <span>Pagamento</span>
                <span>31</span>
              </li>
              <li>
                <span>Mau funcionamento de software</span>
                <span>15</span>
              </li>
              <li>
                <span>Documentação insuficiente</span>
                <span>21</span>
              </li>
              <li>
                <span>Equipamento danificado</span>
                <span>31</span>
              </li>
              <li>
                <span>Outros</span>
                <span>31</span>
              </li>
            </ul>
          </section>
          <section>
            <h3>Usuários cadastrados</h3>

            <ul>
              <li>
                <span>Administradores</span>
                <span>3h:43min</span>
              </li>
              <li>
                <span>Suportes</span>
                <span>6h:43min</span>
              </li>            
              <li>
                <span>Comuns</span>
                <span>6h:43min</span>
              </li>   
              <li>
                <span>Total</span>
                <span>31</span>
              </li>         
            </ul>
          </section>
        </div>
          

      </section>
      <Footer id={userInformation?.role === "admin" ? "footer-admin" : ""} />
    </div>
  );
}

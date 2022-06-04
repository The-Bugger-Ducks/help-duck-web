import { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';

import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import LoadingContainer from "../../shared/components/Loading/LoadingContainer";

import SessionController from "../../shared/utils/handlers/SessionController";

import { Report } from "../../shared/interfaces/report.interface";
import { ReportRequests } from "../../shared/utils/requests/Report.request";

import "../../shared/styles/pages/dashboard/Dashboard.css";
import { FiArrowLeft } from "react-icons/fi";

export default function Dashboard() {
  const navigate = useNavigate();

  const reportRequest = new ReportRequests();
  const userInformation = SessionController.getUserInfo();
  const responseLabelAlternative = "-"

  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<Report>()
  

  useEffect(() => {
    if (userInformation?.role !== "admin") {
      navigate('/homepage');
    }

    getReports()
  }, [])

  async function getReports() {
    try {
      setLoading(true)
      const response = await reportRequest.getReports()
      setLoading(false)
      
      setReport(response)
    } catch (error) {
      //
    }

  }

  return (
    <>
      <LoadingContainer loading={loading} />
      <div id="dashboard">
        <Header hiddenDropdown={false} />
        <section className="dashboard-container">
          <h1>
            <FiArrowLeft
              className="go-back-icon"
              color="var(--color-gray-dark)"
              onClick={() => navigate('/')}
              size={'1.5rem'}
            />
            Relatórios
          </h1>

          <main className="dashboard-main">
            <div className="dashboard-content">
              <section>
                <h3>Chamados</h3>

                <ul>
                  <li>
                    <span>Aguardando</span>
                    <span>{report?.tickets?.total_awaiting ?? responseLabelAlternative}</span>
                  </li>
                  <li>
                    <span>Em Andamento</span>
                    <span>{report?.tickets?.total_underAnalysis ?? responseLabelAlternative}</span>
                  </li>
                  <li>
                    <span>Fechados</span>
                    <span>{report?.tickets?.total_done ?? responseLabelAlternative}</span>
                  </li>
                  <li className="total-row">
                    <span>Total</span>
                    <span>{report?.tickets?.total_tickets ?? responseLabelAlternative}</span>
                  </li>
                </ul>
              </section>
              <section>
                <h3>Tempo médio de ações</h3>

                <ul>
                  <li>
                    <span>Reservar chamado</span>
                    <span>{report?.tickets_time_to_reserve ?? responseLabelAlternative}</span>
                  </li>
                  <li>
                    <span>Fechar chamado</span>
                    <span>{report?.tickets_time_to_done ?? responseLabelAlternative}</span>
                  </li>            
                </ul>
              </section>
            </div>

            <div className="dashboard-content">
              <section>
                <h3>Chamados por problema</h3>

                <ul>
                  <li>
                    <span>Acesso a rede</span>
                    <span>{report?.tickets_per_problem?.network_access ?? responseLabelAlternative}</span>
                  </li>
                  <li>
                    <span>Acesso ao email</span>
                    <span>{report?.tickets_per_problem?.email_access ?? responseLabelAlternative}</span>
                  </li>
                  <li>
                    <span>Uso de beneficios</span>
                    <span>{report?.tickets_per_problem?.benefits_use ?? responseLabelAlternative}</span>
                  </li>
                  <li>
                    <span>Pagamento</span>
                    <span>{report?.tickets_per_problem?.payment ?? responseLabelAlternative}</span>
                  </li>
                  <li>
                    <span>Mau funcionamento de software</span>
                    <span>{report?.tickets_per_problem?.software_malfunction ?? responseLabelAlternative}</span>
                  </li>
                  <li>
                    <span>Documentação insuficiente</span>
                    <span>{report?.tickets_per_problem?.insuficient_doc ?? responseLabelAlternative}</span>
                  </li>
                  <li>
                    <span>Equipamento danificado</span>
                    <span>{report?.tickets_per_problem?.damaged_equipament ?? responseLabelAlternative}</span>
                  </li>
                  <li>
                    <span>Outros</span>
                    <span>{report?.tickets_per_problem?.others ?? responseLabelAlternative}</span>
                  </li>
                </ul>
              </section>
              <section>
                <h3>Usuários cadastrados</h3>

                <ul>
                  <li>
                    <span>Administradores</span>
                    <span>{report?.users?.total_admins ?? responseLabelAlternative}</span>
                  </li>
                  <li>
                    <span>Suportes</span>
                    <span>{report?.users?.total_supports ?? responseLabelAlternative}</span>
                  </li>            
                  <li>
                    <span>Comuns</span>
                    <span>{report?.users?.total_clients ?? responseLabelAlternative}</span>
                  </li>   
                  <li className="total-row">
                    <span>Total</span>
                    <span>{report?.users?.total_users ?? responseLabelAlternative}</span>
                  </li>         
                </ul>
              </section>
            </div>
          </main>   

        </section>
        <Footer />
      </div>
    </>
  );
}

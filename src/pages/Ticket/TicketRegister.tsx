import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import { TicketRequests } from '../../shared/utils/requests/Ticket.requests';

import Button from '../../shared/components/Button';
import Footer from '../../shared/components/Footer';
import Header from '../../shared/components/Header';
import TextField from '../../shared/components/TextField';
import ChoiceField from '../../shared/components/ChoiceField';

import SessionController from '../../shared/utils/handlers/SessionController';
import '../../shared/styles/pages/ticket/TicketRegister.css';

export default function TicketRegister() {
  const [title, setTitle] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [problemType, setProblemType] = useState('');
  const [description, setDescription] = useState('');

  const ticketRequest = new TicketRequests();

  const navigate = useNavigate();

  const ticketPriority = [
    { value: 'low', label: 'Prioridade baixa', selected: false },
    { value: 'medium', label: 'Prioridade média', selected: false },
    { value: 'high', label: 'Prioridade alta', selected: false },
  ];

  const ticketProblemTypes = [
    { value: 'Acesso na rede', label: 'Acesso na rede', selected: false },
    {
      value: 'Mau funcionamento de software',
      label: 'Mau funcionamento de software',
      selected: false,
    },
    { value: 'Acesso ao email', label: 'Acesso ao email', selected: false },
    { value: 'Uso de benefícios', label: 'Uso de benefícios', selected: false },
    { value: 'Pagamento', label: 'Pagamento', selected: false },
    {
      value: 'Documentação insuficiente',
      label: 'Documentação insuficiente',
      selected: false,
    },
    {
      value: 'Equipamento danificado',
      label: 'Equipamento danificado',
      selected: false,
    },
    { value: 'Outros', label: 'Outros', selected: false },
  ];

  async function submitForm(event: FormEvent) {
    event.preventDefault();
    if (
      title === '' ||
      description === '' ||
      priorityLevel === '' ||
      problemType === ''
    ) {
      return alert('Preencha todos os campos');
    }

    const user = SessionController.getUserInfo();
    if (!user) return alert('Não foi possivel cadastrar seu chamado');

    const payload = {
      title,
      description,
      user,
      priorityLevel,
      tags: [problemType],
    };

    const response = await ticketRequest.createTicket(payload);

    if (response?.status === 201) {
      alert('Chamado cadastrado com sucesso!');

      navigate('/homepage');
    }
  }

  return (
    <div id="ticket-register">
      <div className="ticket-register-container">
        <Header hiddenDropdown={false} />
        <div className="ticket-register-content">
          <section className="ticket-register-title">
            <h1>
              <FiArrowLeft
                className="navigation-button"
                color="var(--color-gray-dark)"
                onClick={() => {
                  navigate("/homepage");
                }}
              />
              Cadastro de chamado
            </h1>
          </section>
          <form className="ticket-register-form" onSubmit={submitForm}>
            <section className="form-sections">
              <section className="ticket-register-data">
                <div className="ticket-register-ticket-title">
                  <label htmlFor="titulo">Título</label>
                  <TextField
                    type="text"
                    placeholder="Título do chamado"
                    onChange={event => setTitle(event.target.value)}
                    name="titulo"
                    height={'32px'}
                    backgroundColor={'#FAFAFA'}
                  />
                </div>
                <div className="ticket-register-dual-select">
                  <div className="ticket-register-select first">
                    <label htmlFor="prioridade">Grau de prioridade</label>
                    <ChoiceField
                      onChange={event => setPriorityLevel(event.target.value)}
                      name="prioridade"
                      items={ticketPriority}
                      padding={'0.2rem'}
                      height={'32px'}
                      backgroundColor={'#FAFAFA'}
                    />
                  </div>
                  <div className="ticket-register-select">
                    <label htmlFor="tipo">Tipo de problema</label>
                    <ChoiceField
                      onChange={event => setProblemType(event.target.value)}
                      name="tipo"
                      items={ticketProblemTypes}
                      padding={'0.2rem'}
                      height={'32px'}
                      backgroundColor={'#FAFAFA'}
                    />
                  </div>
                </div>
              </section>
              <section className="ticket-register-description">
                <label htmlFor="titulo">Descrição do problema</label>
                <textarea
                  placeholder="Descreva seu problema aqui"
                  onChange={event => setDescription(event.target.value)}
                  name="description"
                />
              </section>
              <section className="ticket-register-submit">
                <Button type="submit" width="12rem">
                  Abrir Chamado
                </Button>
              </section>
            </section>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

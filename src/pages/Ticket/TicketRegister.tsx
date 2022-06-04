import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import { TicketRequests } from '../../shared/utils/requests/Ticket.requests';

import Button from '../../shared/components/Button';
import Footer from '../../shared/components/Footer';
import Header from '../../shared/components/Header';
import TextField from '../../shared/components/TextField';
import ChoiceField from '../../shared/components/ChoiceField';
import LoadingContainer from '../../shared/components/Loading/LoadingContainer';

import SessionController from '../../shared/utils/handlers/SessionController';
import '../../shared/styles/pages/ticket/TicketRegister.css';
import { EquipmentUpdate } from '../../shared/interfaces/equipment.interface';
import { EquipmentRequests } from '../../shared/utils/requests/Equipment.requests';
import Ticket from '../../shared/interfaces/ticket.interface';
import { ProblemRequests } from '../../shared/utils/requests/Problem.requests';

export default function TicketRegister() {
  const equipmentRequest = new EquipmentRequests();
  const [title, setTitle] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [problem, setProblem] = useState<Ticket['problem']>();
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [equipments, setEquipments] = useState<EquipmentUpdate[]>();
  const [equipmentSelected, setEquipmentSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketProblems, setTicketProblems] =
    useState<Array<{ value: string; label: string; selected?: boolean }>>();

  const ticketRequest = new TicketRequests();
  const problemRequest = new ProblemRequests();

  const navigate = useNavigate();

  const ticketPriority = [
    { value: 'low', label: 'Prioridade baixa', selected: false },
    { value: 'medium', label: 'Prioridade média', selected: false },
    { value: 'high', label: 'Prioridade alta', selected: false },
  ];

  useEffect(() => {
    getEquipmentsList();
    getTicketProblemsList();
  }, []);

  async function getTicketProblemsList() {
    const problems = await problemRequest.getProblems();

    let problemsList: Array<{
      value: string;
      label: string;
      selected?: boolean;
    }> = [];

    problems.content.map((problem: { id: string; title: string }) => {
      problemsList.push({
        value: problem.id,
        selected: false,
        label: problem.title,
      });
    });

    setTicketProblems(problemsList);
  }

  async function handleProblemType(problemType: String) {
    const ticketProblem = await problemRequest.getProblem(problemType);
    setProblem(ticketProblem);
  }

  const equipmentList: {
    value: string;
    label: string;
    selected?: boolean | undefined;
  }[] = [];

  equipments &&
    equipments.map(equipment => {
      const listValue = {
        label: equipment.name,
        value: equipment.id,
        selected: false,
      };
      equipmentList.push(listValue);
    });

  async function handleEquipment(equipmentValue: string) {
    setLoading(true);
    const searchedEquipment = await equipmentRequest.listEquipmentByID(
      equipmentValue
    );
    setEquipmentSelected(searchedEquipment);
    setLoading(false);
  }

  const getEquipmentsList = async (sorting?: string) => {
    setLoading(true);
    const response: { content: [] } =
      await equipmentRequest.listEquipmentRequest(sorting);
    const equipments: EquipmentUpdate[] = response.content;
    setEquipments(equipments);
    setLoading(false);
  };

  async function submitForm(event: FormEvent) {
    event.preventDefault();

    if (
      title === '' ||
      description === '' ||
      priorityLevel === '' ||
      problem === null
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
      problem,
      equipment: equipmentSelected != "" ? equipmentSelected : null,
      department: user.department,
    };

    setLoading(true);

    const response = await ticketRequest.createTicket(payload);

    setLoading(false);

    if (response?.status === 201) {
      alert('Chamado cadastrado com sucesso!');

      navigate('/homepage');
    }
  }

  return (
    <>
      <LoadingContainer loading={loading} />
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
                    navigate('/homepage');
                  }}
                />
                Cadastro de chamado
              </h1>
            </section>
            <form className="ticket-register-form" onSubmit={submitForm}>
              <section className="form-sections">
                <section className="ticket-register-data">
                  <div className="ticket-register-dual-select">
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
                    <div className="ticket-register-select">
                      <label htmlFor="tipo">Tipo de problema</label>
                      <ChoiceField
                        onChange={event =>
                          handleProblemType(event.target.value)
                        }
                        name="tipo"
                        items={ticketProblems ?? []}
                        padding={'0.2rem'}
                        height={'32px'}
                        backgroundColor={'#FAFAFA'}
                      />
                    </div>
                  </div>
                  <div className="ticket-register-dual-select">
                    <div className="ticket-priority">
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
                    <div className="ticket-equipment">
                      <label htmlFor="equipment">
                        Equipamento relacionado:
                      </label>
                      <ChoiceField
                        onChange={event => handleEquipment(event.target.value)}
                        name="equipment"
                        items={equipmentList}
                        padding={'0.2rem'}
                        height={'32px'}
                        backgroundColor={'#FAFAFA'}
                        required={false}
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
    </>
  );
}

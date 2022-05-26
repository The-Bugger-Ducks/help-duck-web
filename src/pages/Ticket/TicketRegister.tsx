import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import { TicketRequests } from "../../shared/utils/requests/Ticket.requests";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import ChoiceField from "../../shared/components/ChoiceField";
import LoadingContainer from "../../shared/components/Loading/LoadingContainer";

import { departmentList } from "../../shared/constants/departmentList";

import SessionController from "../../shared/utils/handlers/SessionController";
import "../../shared/styles/pages/ticket/TicketRegister.css";
import { EquipmentUpdate } from "../../shared/interfaces/equipment.interface";
import { EquipmentRequests } from "../../shared/utils/requests/Equipment.requests";

export default function TicketRegister() {
  const equipmentRequest = new EquipmentRequests();
  const [title, setTitle] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [problemType, setProblemType] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [equipments, setEquipments] = useState<EquipmentUpdate[]>();
  const [equipmentSelected, setEquipmentSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const ticketRequest = new TicketRequests();

  const navigate = useNavigate();

  const ticketPriority = [
    { value: "low", label: "Prioridade baixa", selected: false },
    { value: "medium", label: "Prioridade média", selected: false },
    { value: "high", label: "Prioridade alta", selected: false },
  ];

  const ticketProblemTypes = [
    { value: "Acesso na rede", label: "Acesso na rede", selected: false },
    {
      value: 'Mau funcionamento de software',
      label: 'Mau funcionamento de software',
      selected: false,
    },
    { value: "Acesso ao email", label: "Acesso ao email", selected: false },
    { value: "Uso de benefícios", label: "Uso de benefícios", selected: false },
    { value: "Pagamento", label: "Pagamento", selected: false },
    {
      value: "Documentação insuficiente",
      label: "Documentação insuficiente",
      selected: false,
    },
    {
      value: "Equipamento danificado",
      label: "Equipamento danificado",
      selected: false,
    },
    { value: "Outros", label: "Outros", selected: false },
  ];

  useEffect(() => {
    getEquipmentsList();
  }, []);

  const equipmentList: {
    value: string;
    label: string;
    selected?: boolean | undefined;
  }[] = [];
  equipments &&
    equipments.map((equipment, index) => {
      const listValue = {
        label: equipment.name,
        value: equipment.id,
        selected: false,
      };
      equipmentList.push(listValue);
    });

  function handleDepartment(departmentValue: string) {
    if (departmentValue == "marketingAndSales") {
      setDepartment("Marketing e vendas");
    } else if (departmentValue == "financial") {
      setDepartment("Financeiro");
    } else if (departmentValue == "operations") {
      setDepartment("Operações");
    } else if (departmentValue == "rh") {
      setDepartment("RH");
    } else if (departmentValue == "eps") {
      setDepartment("EPS");
    } else if (departmentValue == "ti") {
      setDepartment("TI");
    } else if (departmentValue == "epdi") {
      setDepartment("EPDI");
    } else if (departmentValue == "others") {
      setDepartment("Outros");
    }
  }

  async function handleEquipment(equipmentValue: string) {
    const searchedEquipment = await equipmentRequest.listEquipmentByID(
      equipmentValue
    );
    setEquipmentSelected(searchedEquipment);
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
      title === "" ||
      description === "" ||
      priorityLevel === "" ||
      problemType === "" ||
      department === "" ||
      equipmentSelected === ""
    ) {
      return alert("Preencha todos os campos");
    }

    const user = SessionController.getUserInfo();
    if (!user) return alert("Não foi possivel cadastrar seu chamado");

    const payload = {
      title,
      description,
      user,
      priorityLevel,
      tags: [problemType],
      equipment: equipmentSelected,
      requestingDepartment: department,
    };

    setLoading(true);

    const response = await ticketRequest.createTicket(payload);

    setLoading(false);

    if (response?.status === 201) {
      alert("Chamado cadastrado com sucesso!");

      navigate("/homepage");
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
                    navigate("/homepage");
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
                        onChange={(event) => setProblemType(event.target.value)}
                        name="tipo"
                        items={ticketProblemTypes}
                        padding={"0.2rem"}
                        height={"32px"}
                        backgroundColor={"#FAFAFA"}
                      />
                    </div>
                  </div>
                  <div className="ticket-register-dual-select">
                    <div>
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
                    <div id="inputs">
                      <label htmlFor="department">
                        Departamento solicitante:
                      </label>
                      <ChoiceField
                        onChange={(event) =>
                          handleDepartment(event.target.value)
                        }
                        name="department"
                        items={departmentList()}
                        padding={"0.2rem"}
                        height={"32px"}
                        backgroundColor={"#FAFAFA"}
                      />
                    </div>
                    <div id="inputs">
                      <label htmlFor="equipment">
                        Equipamento relacionado:
                      </label>
                      <ChoiceField
                        onChange={(event) =>
                          handleEquipment(event.target.value)
                        }
                        name="equipment"
                        items={equipmentList}
                        padding={"0.2rem"}
                        height={"32px"}
                        backgroundColor={"#FAFAFA"}
                      />
                    </div>
                  </div>
                </section>
                <section className="ticket-register-description">
                  <label htmlFor="titulo">Descrição do problema</label>
                  <textarea
                    placeholder="Descreva seu problema aqui"
                    onChange={(event) => setDescription(event.target.value)}
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

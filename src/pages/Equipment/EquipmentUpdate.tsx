import { useState, FormEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { departmentListVariable } from "../../shared/constants/departmentList";

import { FiArrowLeft } from "react-icons/fi";

import { EquipmentRequests } from "../../shared/utils/requests/Equipment.requests";
import { EquipmentUpdate } from "../../shared/interfaces/equipment.interface";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import ChoiceField from "../../shared/components/ChoiceField";
import ButtonDelete from "../../shared/components/ButtonDelete";
import LoadingContainer from "../../shared/components/Loading/LoadingContainer";

import "../../shared/styles/pages/equipment/EquipmentUpdate.css";
import SessionController from "../../shared/utils/handlers/SessionController";

export default function EquipmentUpdatePage() {
  const equipmentRequests = new EquipmentRequests();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  function handleDepartmentLabel(departmentLabel: string) {
    if (departmentLabel === "Marketing e vendas") {
      setSelectedDepartment("marketingAndSales");
    } else if (departmentLabel === "Financeiro") {
      setSelectedDepartment("financial");
    } else if (departmentLabel === "Operações") {
      setSelectedDepartment("operations");
    } else if (departmentLabel === "RH") {
      setSelectedDepartment("rh");
    } else if (departmentLabel === "EPS") {
      setSelectedDepartment("eps");
    } else if (departmentLabel === "TI") {
      setSelectedDepartment("ti");
    } else if (departmentLabel === "EPDI") {
      setSelectedDepartment("epdi");
    } else if (departmentLabel === "Outros") {
      setSelectedDepartment("others");
    }
  }

  function handleDepartmentValue(departmentValue: string) {
    if (departmentValue === "marketingAndSales") {
      setDepartment("Marketing e vendas");
    } else if (departmentValue === "financial") {
      setDepartment("Financeiro");
    } else if (departmentValue === "operations") {
      setDepartment("Operações");
    } else if (departmentValue === "rh") {
      setDepartment("RH");
    } else if (departmentValue === "eps") {
      setDepartment("EPS");
    } else if (departmentValue === "ti") {
      setDepartment("TI");
    } else if (departmentValue === "epdi") {
      setDepartment("EPDI");
    } else if (departmentValue === "others") {
      setDepartment("Outros");
    }
  }

  useEffect(() => {
    const subscribe = getEquipment();

    return () => {
      subscribe.finally();
    };
  }, []);

  async function getEquipment() {
    setLoading(true);
    const response: EquipmentUpdate = await equipmentRequests.listEquipmentByID(
      id ?? ""
    );

    setName(response.name);
    setModel(response.model);
    setBrand(response.brand);
    setType(response.type);
    setLoading(false);

    if (response.department) {
      handleDepartmentLabel(response.department);
    }
  }

  function back() {
    navigate("/homepage");
  }

  async function deleteEquipment() {
    const isConfirmed = window.confirm(
      "Tem certeza de que deseja excluir o equipamento?"
    );

    if (isConfirmed) {
      setLoading(true);
      await equipmentRequests.deleteEquipment(id ?? "");
      setLoading(false);
      alert("Equipamento deletado com sucesso!");
      navigate("/homepage");
    }
  }

  async function submitForm(event: FormEvent) {
    event.preventDefault();

    const user = SessionController.getUserInfo();

    const payload: EquipmentUpdate = {
      id: id ?? "",
      name: name,
      model: model,
      brand: brand,
      type: type,
      department: department,
    };

    setLoading(true);
    await equipmentRequests.updateEquipment(payload);

    setLoading(false);
    alert("Equipamento editado com sucesso!");
    navigate("/homepage");
  }

  return (
    <>
      <LoadingContainer loading={loading} />
      <div id="equipment-update">
        <div className="equipment-update-container">
          <Header hiddenDropdown={false} />
          <div className="equipment-update-content">
            <section className="equipment-update-title">
              <h1>
                <div>
                  <FiArrowLeft
                    className="Icon"
                    color="var(--color-gray-dark)"
                    onClick={back}
                  />
                </div>
                Detalhes do equipamento
              </h1>
            </section>
            <form className="equipment-update-form" onSubmit={submitForm}>
              <section className="form-sections">
                <section className="equipment-update-data">
                  <div>
                    <label htmlFor="name">Nome</label>
                    <TextField
                      type="text"
                      placeholder={name}
                      onChange={(event) => setName(event.target.value)}
                      name="name"
                      backgroundColor="#FAFAFA"
                    />
                  </div>
                  <div>
                    <label htmlFor="brand">Marca</label>
                    <TextField
                      name="brand"
                      type="text"
                      placeholder={brand}
                      backgroundColor="#EDEDEE"
                      disabled={true}
                    />
                  </div>
                </section>
                <section className="equipment-update-data">
                  <div>
                    <label htmlFor="model">Modelo</label>
                    <TextField
                      type="text"
                      placeholder={model}
                      name="model"
                      backgroundColor="#EDEDEE"
                      disabled={true}
                    />
                  </div>
                  <div>
                    <label htmlFor="type">Tipo</label>
                    <TextField
                      type="text"
                      placeholder={type}
                      name="type"
                      backgroundColor="#EDEDEE"
                      disabled={true}
                    />
                  </div>
                </section>
                <section className="equipment-update-data">
                  <div>
                    <label htmlFor="department">Departamento</label>
                    <ChoiceField
                      name="department"
                      items={departmentListVariable(selectedDepartment)}
                      backgroundColor="#FAFAFA"
                      onChange={(event) =>
                        handleDepartmentValue(event.target.value)
                      }
                    />
                  </div>
                </section>
              </section>
              <section className="equipment-update-submit">
                <ButtonDelete
                  type="button"
                  width="15rem"
                  onClick={deleteEquipment}
                >
                  Excluir equipamento
                </ButtonDelete>

                <Button type="submit" width="15rem" color="#FAFAFA">
                  Confirmar alterações
                </Button>
              </section>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

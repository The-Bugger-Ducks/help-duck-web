import { useState, FormEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import { EquipmentRequests } from "../../shared/utils/requests/Equipment.requests";
import { EquipmentUpdate } from "../../shared/interfaces/equipment.interface";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import ChoiceField from "../../shared/components/ChoiceField";
import "../../shared/styles/pages/equipment/EquipmentUpdate.css";
import ButtonDelete from "../../shared/components/ButtonDelete";

export default function EquipmentUpdatePage() {
  const equipmentRequests = new EquipmentRequests();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const subscribe = getEquipment();

    return () => {
      subscribe.finally();
    };
  }, []);

  async function getEquipment() {
    const response: EquipmentUpdate = await equipmentRequests.listEquipmentByID(
      id ?? ""
    );

    setName(response.name);
    setModel(response.model);
    setBrand(response.brand);
    setType(response.type);
    setDepartment(response.department);
    handleDepartmentLabel(response.department);
  }

  function back() {
    navigate("/homepage");
  }

  function handleDepartmentValue(departmentValue: string) {
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
    }
  }

  function handleDepartmentLabel(departmentLabel: string) {
    if (departmentLabel == "Marketing e vendas") {
      setSelectedDepartment("marketingAndSales");
    } else if (departmentLabel == "Financeiro") {
      setSelectedDepartment("financial");
    } else if (departmentLabel == "Operações") {
      setSelectedDepartment("operations");
    } else if (departmentLabel == "RH") {
      setSelectedDepartment("rh");
    } else if (departmentLabel == "EPS") {
      setSelectedDepartment("eps");
    } else if (departmentLabel == "TI") {
      setSelectedDepartment("ti");
    } else if (departmentLabel == "EPDI") {
      setSelectedDepartment("epdi");
    }
  }

  function isSelected(value: string) {
    return value === selectedDepartment ? true : false;
  }

  async function submitForm(event: FormEvent) {
    event.preventDefault();

    const payload: EquipmentUpdate = {
      id: id ?? "",
      name: name,
      model: model,
      brand: brand,
      type: type,
      department: department,
    };

    await equipmentRequests.updateEquipment(payload);

    alert("Equipamento editado com sucesso!");
    navigate("/homepage");
  }

  return (
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
              Cadastro de equipamentos
            </h1>
          </section>
          <form className="equipment-update-form" onSubmit={submitForm}>
            <section className="form-sections">
              <section className="equipment-update-data">
                <div>
                  <label htmlFor="name">Nome:</label>
                  <TextField
                    type="text"
                    placeholder={name}
                    onChange={(event) => setName(event.target.value)}
                    name="name"
                    backgroundColor="#FAFAFA"
                  />
                </div>
                <div>
                  <label htmlFor="brand">Marca:</label>
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
                  <label htmlFor="model">Modelo:</label>
                  <TextField
                    type="text"
                    placeholder={model}
                    name="model"
                    backgroundColor="#EDEDEE"
                    disabled={true}
                  />
                </div>
                <div>
                  <label htmlFor="type">Tipo:</label>
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
                  <label htmlFor="department">Departamento:</label>
                  <ChoiceField
                    name="department"
                    items={[
                      {
                        selected: isSelected("marketingAndSales"),
                        value: "marketingAndSales",
                        label: "Marketing e vendas",
                      },
                      {
                        selected: isSelected("financial"),
                        value: "financial",
                        label: "Financeiro",
                      },
                      {
                        selected: isSelected("operations"),
                        value: "operations",
                        label: "Operações",
                      },
                      {
                        selected: isSelected("rh"),
                        value: "rh",
                        label: "RH",
                      },
                      {
                        selected: isSelected("eps"),
                        value: "eps",
                        label: "EPS",
                      },
                      {
                        selected: isSelected("ti"),
                        value: "ti",
                        label: "TI",
                      },
                      {
                        selected: isSelected("epdi"),
                        value: "epdi",
                        label: "EPDI",
                      },
                    ]}
                    backgroundColor="#FAFAFA"
                    onChange={(event) =>
                      handleDepartmentValue(event.target.value)
                    }
                  />
                </div>
              </section>
            </section>
            <section className="equipment-update-submit">
              <ButtonDelete type="button" width="15rem">
                Excluir equipamento
              </ButtonDelete>

              <Button type="submit" width="15rem" color="#FAFAFA">
                Editar equipamento
              </Button>
            </section>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

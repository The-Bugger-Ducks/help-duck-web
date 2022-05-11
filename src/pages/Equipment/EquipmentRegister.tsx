import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import { EquipmentRequests } from "../../shared/utils/requests/Equipment.requests";
import { Equipment } from "../../shared/interfaces/equipment.interface";

import Button from "../../shared/components/Button";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import TextField from "../../shared/components/TextField";
import ChoiceField from "../../shared/components/ChoiceField";

import SessionController from "../../shared/utils/handlers/SessionController";
import "../../shared/styles/pages/equipment/EquipmentRegister.css";

export default function EquipmentRegister() {
  const equipmentRequests = new EquipmentRequests();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [department, setDepartment] = useState("");

  function back() {
    navigate("/homepage");
  }

  async function submitForm(event: FormEvent) {
    event.preventDefault();
    if (
      name === "" ||
      model === "" ||
      brand === "" ||
      type === "" ||
      department === ""
    ) {
      return alert("Preencha todos os campos");
    }

    const user = SessionController.getUserInfo();
    if (!user) return alert("Não foi possivel cadastrar seu chamado");

    const payload: Equipment = {
      name: name,
      model: model,
      brand: brand,
      type: type,
      department: department,
    };

    const response = await equipmentRequests.createEquipment(payload);

    if (response?.status === 201) {
      alert("Equipamento cadastrado com sucesso!");

      navigate("/homepage");
    }
  }

  return (
    <div id="equipment-register">
      <div className="equipment-register-container">
        <Header hiddenDropdown={false} />
        <div className="equipment-register-content">
          <section className="equipment-register-title">
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
          <form className="equipment-register-form" onSubmit={submitForm}>
            <section className="form-sections">
              <section className="equipment-register-data">
                <div>
                  <label htmlFor="name">Nome:</label>
                  <TextField
                    type="text"
                    placeholder="Nome do equipamento"
                    onChange={(event) => setName(event.target.value)}
                    name="name"
                    backgroundColor="#FAFAFA"
                  />
                </div>
                <div>
                  <label htmlFor="brand">Marca:</label>
                  <TextField
                    onChange={(event) => setBrand(event.target.value)}
                    name="brand"
                    type="text"
                    placeholder="Marca do equipamento"
                    backgroundColor="#FAFAFA"
                  />
                </div>
              </section>

              <section className="equipment-register-data">
                <div>
                  <label htmlFor="model">Modelo:</label>
                  <TextField
                    type="text"
                    placeholder="Modelo do equipamento"
                    onChange={(event) => setModel(event.target.value)}
                    name="model"
                    backgroundColor="#FAFAFA"
                  />
                </div>
                <div>
                  <label htmlFor="type">Tipo:</label>
                  <TextField
                    type="text"
                    placeholder="Tipo do equipamento"
                    onChange={(event) => setType(event.target.value)}
                    name="type"
                    backgroundColor="#FAFAFA"
                  />
                </div>
              </section>
              <section className="equipment-register-data">
                <div>
                  <label htmlFor="type">Departamento:</label>
                  <TextField
                    type="text"
                    placeholder="Departamento do equipamento"
                    onChange={(event) => setDepartment(event.target.value)}
                    name="department"
                    backgroundColor="#FAFAFA"
                  />
                </div>
              </section>
            </section>
            <section className="equipment-register-submit">
              <Button type="submit" width="15rem">
                Cadastrar equipamento
              </Button>
            </section>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

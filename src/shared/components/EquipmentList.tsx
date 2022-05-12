import "../styles/components/EquipmentList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EquipmentUpdate } from "../interfaces/equipment.interface";
import { EquipmentRequests } from "../utils/requests/Equipment.requests";
import EquipmentComponent from "./EquipmentComponent";

export default function EquipmentList() {
  const equipmentRequest = new EquipmentRequests();
  const [equipments, setEquipments] = useState<EquipmentUpdate[]>();
  const navigate = useNavigate();

  useEffect(() => {
    getEquipmentsList();
  }, []);

  const getEquipmentsList = async () => {
    const response: { content: [] } =
      await equipmentRequest.listEquipmentRequest();
    const equipments: EquipmentUpdate[] = response.content;
    setEquipments(equipments);
  };

  return (
    <section className="equipments-list-container">
      <div className="grid-equipments">
        <table>
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Modelo</th>
              <th>Marca</th>
              <th>Tipo</th>
              <th>Departamento</th>
            </tr>
            {equipments && equipments.length > 0 ? (
              equipments.map((equipment, index) => {
                return (
                  <EquipmentComponent
                    name={equipment.name}
                    model={equipment.model}
                    brand={equipment.brand}
                    type={equipment.type}
                    department={equipment.department}
                    onClick={() =>
                      navigate(`/equipment_update/${equipment.id}`)
                    }
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="no-results">
                  Não foi encontrado nenhum equipamento
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

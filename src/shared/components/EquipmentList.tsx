import "../styles/components/EquipmentList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EquipmentUpdate } from "../interfaces/equipment.interface";
import { EquipmentRequests } from "../utils/requests/Equipment.requests";

import EquipmentComponent from "./EquipmentComponent";
import CustomTableRow from "./Loading/CustomTableRow";

export default function EquipmentList() {
  const equipmentRequest = new EquipmentRequests();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState<EquipmentUpdate[]>();

  useEffect(() => {
    getEquipmentsList();
  }, []);

  const getEquipmentsList = async () => {
    setLoading(true)
    const response: { content: [] } =
      await equipmentRequest.listEquipmentRequest();

    setLoading(false)
    
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
            ) : <CustomTableRow loading={loading} colSpan={5} typeTableRowText="equipamento" />}

          </tbody>
        </table>
      </div>
    </section>
  );
}

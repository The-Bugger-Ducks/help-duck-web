import "../styles/components/EquipmentList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EquipmentUpdate } from "../interfaces/equipment.interface";
import { EquipmentRequests } from "../utils/requests/Equipment.requests";
import EquipmentComponent from "./EquipmentComponent";
import { FaArrowUp } from "react-icons/fa";

import {
  OrderByTypes,
  SortEquipmentTableTypes,
} from "../constants/sortTableEnum";

export default function EquipmentList() {
  const equipmentRequest = new EquipmentRequests();
  const [equipments, setEquipments] = useState<EquipmentUpdate[]>();
  const [headerSortTarget, setHeaderSortTarget] = useState<Element>();
  const navigate = useNavigate();

  const tableHeaderOptions = [
    { text: "Nome", type: SortEquipmentTableTypes.name },
    { text: "Modelo", type: SortEquipmentTableTypes.model },
    { text: "Marca", type: SortEquipmentTableTypes.badge },
    { text: "Tipo", type: SortEquipmentTableTypes.type },
    { text: "Departamento", type: SortEquipmentTableTypes.department },
  ];

  useEffect(() => {
    getEquipmentsList();
  }, []);

  const getEquipmentsList = async (sorting?: string) => {
    const response: { content: [] } =
      await equipmentRequest.listEquipmentRequest(sorting);
    const equipments: EquipmentUpdate[] = response.content;
    setEquipments(equipments);
  };

  function handleClickOptionSort(event: any, sorting: SortEquipmentTableTypes) {
    const currentTarget = event.currentTarget;

    const optionAlreadySorted = currentTarget.id === headerSortTarget?.id;

    const visibleStyle = currentTarget.classList.contains("visible");
    const orderByStyle = currentTarget.classList.contains("order-by");

    if (headerSortTarget && !optionAlreadySorted) {
      headerSortTarget.classList.remove("visible");
      headerSortTarget.classList.remove("order-by");
    }

    if (!optionAlreadySorted) {
      setHeaderSortTarget(currentTarget);
      currentTarget.classList.add("visible");
    }

    let orderBy = OrderByTypes.none;
    if (visibleStyle && orderByStyle) {
      orderBy = OrderByTypes.none;
      currentTarget.classList.remove("visible");
      currentTarget.classList.remove("order-by");
    } else if (visibleStyle && !orderByStyle) {
      orderBy = OrderByTypes.asc;
      currentTarget.classList.add("order-by");
    } else {
      orderBy = OrderByTypes.desc;
      currentTarget.classList.add("visible");
    }

    handleTableSorting(sorting, orderBy);
  }

  function handleTableSorting(
    type: SortEquipmentTableTypes,
    orderBy: OrderByTypes
  ) {
    const containsOrderBy = orderBy !== OrderByTypes.none;

    let sort = "";
    if (containsOrderBy) {
      sort = `page=0&size=50&sort=${type},${orderBy}`;
    } else {
      sort = `page=0&size=50&sort=${type}`;
    }

    getEquipmentsList(sort);
  }

  return (
    <section className="equipments-list-container">
      <div className="grid-equipments">
        <table>
          <tbody>
            <tr>
              {tableHeaderOptions.map((option, index) => (
                <th
                  id={`${index}`}
                  key={index}
                  onClick={(event) => handleClickOptionSort(event, option.type)}
                >
                  {option.text}
                  <FaArrowUp className="th-arrow" />
                </th>
              ))}
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

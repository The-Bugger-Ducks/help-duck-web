import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowUp } from "react-icons/fa";

import EquipmentComponent from "./EquipmentComponent";
import CustomTableRow from "./Loading/CustomTableRow";

import { EquipmentUpdate } from "../interfaces/equipment.interface";
import { EquipmentRequests } from "../utils/requests/Equipment.requests";

import {
  OrderByTypes,
  SortEquipmentTableTypes,
} from "../constants/sortTableEnum";

import "../styles/components/EquipmentList.css";
import Pagination from "./Pagination/Pagination";
import { Pageable } from "../interfaces/pagable.interface";

export default function EquipmentList({
  filterEquipment,
  nameEquipment,
}: {
  filterEquipment: string;
  nameEquipment: string;
}) {
  const equipmentRequest = new EquipmentRequests();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState<EquipmentUpdate[]>();
  const [headerSortTarget, setHeaderSortTarget] = useState<Element>();

  const [pageable, setPageable] = useState<Pageable>();

  const [orderBy, setOrderBy] = useState<OrderByTypes>();
  const [sort, setSort] = useState<SortEquipmentTableTypes>();

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(0);

  const [uriParam, setUriParam] = useState("");

  const tableHeaderOptions = [
    { text: "Nome", type: SortEquipmentTableTypes.name },
    { text: "Modelo", type: SortEquipmentTableTypes.model },
    { text: "Marca", type: SortEquipmentTableTypes.badge },
    { text: "Tipo", type: SortEquipmentTableTypes.type },
    { text: "Departamento", type: SortEquipmentTableTypes.department },
  ];

  useEffect(() => {
    if (filterEquipment.length != 0 || nameEquipment.length != 0) {
      getEquipmentsList(uriParam);
    }
  }, [filterEquipment, nameEquipment]);

  useEffect(() => {
    getEquipmentsList();
  }, [filterEquipment, nameEquipment]);

  const getEquipmentsList = async (sorting?: string) => {
    setLoading(true);

    const response = await equipmentRequest.searchEquipment(
      nameEquipment ? nameEquipment : "",
      filterEquipment ? filterEquipment : "",
      sorting
    );

    setLoading(false);

    setEquipments(response.content);
    setPageable(response);
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

    let sortAux = "";
    if (containsOrderBy) {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${type},${orderBy}`;
    } else {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${type}`;
    }

    setSort(type);
    setOrderBy(orderBy);
    setUriParam(sortAux);
    getEquipmentsList(sortAux);
  }

  function handlePageable(pageNumber: number, pageSize: number) {
    setPageNumber(pageNumber);
    setPageSize(pageSize);

    let sortAux = "";
    if (orderBy) {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${sort},${orderBy}`;
    } else {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${sort}`;
    }

    setUriParam(sortAux);
    getEquipmentsList(sortAux);
  }

  return (
    <>
      <section className="equipments-list-container">
        <div className="grid-equipments">
          <table>
            <tbody>
              <tr>
                {tableHeaderOptions.map((option, index) => (
                  <th
                    id={`${index}`}
                    key={index}
                    onClick={(event) =>
                      handleClickOptionSort(event, option.type)
                    }
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
                      department={
                        equipment.department
                          ? equipment.department
                          : "Não há departamento cadastrado"
                      }
                      onClick={() =>
                        navigate(`/equipment_update/${equipment.id}`)
                      }
                    />
                  );
                })
              ) : (
                <CustomTableRow
                  colSpan={5}
                  loading={loading}
                  typeTableRowText={"equipamento"}
                />
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Pagination pageable={pageable} onChangePage={handlePageable} />
    </>
  );
}

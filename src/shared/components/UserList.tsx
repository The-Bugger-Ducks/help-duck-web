import { useEffect, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserRequests } from "../utils/requests/User.requests";

import { FaArrowUp } from "react-icons/fa";

import UserComponent from "./UserComponent";
import CustomTableRow from "./Loading/CustomTableRow";
import Pagination from "./Pagination/Pagination";

import { User } from "../interfaces/user.interface";
import { OrderByTypes, SortUserTableTypes } from "../constants/sortTableEnum";
import { Pageable } from "../interfaces/pagable.interface";

import "../styles/components/UserList.css";

export default function UserList({filterUserList, username} : {filterUserList: string, username: string})  {
  const navigate = useNavigate();
  
  const userRequest = new UserRequests();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [headerSortTarget, setHeaderSortTarget] = useState<Element>();

  const [pageable, setPageable] = useState<Pageable>();

  const [orderBy, setOrderBy] = useState<OrderByTypes>();
  const [sort, setSort] = useState<SortUserTableTypes>();
  const [uriParam, setUriParam] = useState("");

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(0);

  const tableHeaderOptions = [
    { text: "Nome", type: SortUserTableTypes.name },
    { text: "Email", type: SortUserTableTypes.email },
    { text: "Tipo de usuário", type: SortUserTableTypes.role },
    { text: "Departamento", type: SortUserTableTypes.department },
  ];

  useEffect(() => {
    getUserList()
  }, [])
  
  useEffect(() => {
    if (filterUserList.length != 0 || username.length != 0) {
      getUserList(uriParam)
    }
  }, [filterUserList, username])

  async function getUserList(sorting?: string) {
    setLoading(true);

    const role = filterUserList !== "allUsers" ? filterUserList : "";

    const response = await userRequest.searchUsers(username, role, sorting);

    setLoading(false);

    setUsers(response.content ?? []);
    setPageable(response);
  };  

  function handleClickOptionSort(
    event: MouseEvent,
    sorting: SortUserTableTypes
  ) {
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

  function handleTableSorting(type: SortUserTableTypes, orderBy: OrderByTypes) {
    const containsOrderBy = orderBy !== OrderByTypes.none;

    let sortAux = "";
    if (containsOrderBy) {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${type},${orderBy}`;
    } else {
      sortAux = `page=${pageNumber}&size=${pageSize}&sort=${type}`;
    }

    setSort(type);
    setOrderBy(orderBy);
    setUriParam(sortAux)

    getUserList(sortAux);
  }

  function handleRoleName(role: string) {
    if (role === "support") {
      return "suporte";
    } else if (role === "admin") {
      return "administrador";
    } else {
      return "cliente";
    }
  }

  function handleDepartmentName(department: string) {
    if (department === "marketingAndSales"){
      return "marketing e vendas";
    } else if (department === "finance"){
      return "financeiro";
    } else if (department === "operations"){
      return "operações";
    } else if (department === "rh"){
      return "RH";
    } else if (department === "eps"){
      return "EPS";
    } else if (department === "ti"){
      return "TI";
    } else if (department === "epdi"){
      return "EPDI";
    } else if (department === "ti"){
      return "TI";
    } else {
      return "sem departamento definido";
    }
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

    setUriParam(sortAux)
    getUserList(sortAux);
  }

  return (
    <>
      <section className="user-list-container">
        <div className="grid-users">
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
              {users && users.length > 0 ? (
                users.map((user, index) => {
                  return (
                    <UserComponent
                      key={user.id}
                      name={`${user.firstName} ${user.lastName}`}
                      email={user.email}
                      role={handleRoleName(user.role)}
                      department={handleDepartmentName(user.department)}
                      onClick={() => navigate(`/user/edit/${user.id}`)}
                    />
                  );
                })
              ) : (
                <CustomTableRow
                  loading={loading}
                  colSpan={4}
                  typeTableRowText="usuário"
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

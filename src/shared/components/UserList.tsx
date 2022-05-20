import { useEffect, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserRequests } from "../utils/requests/User.requests";

import { FaArrowUp } from "react-icons/fa";

import UserComponent from "./UserComponent";
import CustomTableRow from "./Loading/CustomTableRow";

import { User } from "../interfaces/user.interface";
import { OrderByTypes, SortUserTableTypes } from "../constants/sortTableEnum";

import "../styles/components/UserList.css";
import Pagination from "./Pagination/Pagination";

export default function TicketList() {
  const userRequest = new UserRequests();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [headerSortTarget, setHeaderSortTarget] = useState<Element>();

  const tableHeaderOptions = [
    { text: "Nome", type: SortUserTableTypes.name },
    { text: "Email", type: SortUserTableTypes.email },
    { text: "Tipo de usuário", type: SortUserTableTypes.role },
  ];

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async (sorting?: string) => {
    setLoading(true);
    const response: { content: [] } = await userRequest.listUserRequest(
      sorting
    );
    
    setLoading(false);

    const users: User[] = response.content;
    setUsers(users);
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

  const navigate = useNavigate()

  function handleTableSorting(type: SortUserTableTypes, orderBy: OrderByTypes) {
    const containsOrderBy = orderBy !== OrderByTypes.none;


    let sort = "";
    if (containsOrderBy) {
      sort = `page=0&size=50&sort=${type},${orderBy}`;
    } else {
      sort = `page=0&size=50&sort=${type}`;
    }

    getUserList(sort);
  }

  function handleRoleName(role: string) {
    if ( role === "support") {
      return "suporte"
    } else if ( role === "admin") {
      return "administrador"
    } else {
      return "cliente"
    }
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
                    onClick={(event) => handleClickOptionSort(event, option.type)}
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
                      name={`${user.firstName} ${user.lastName}`}
                      email={user.email}
                      role={handleRoleName(user.role)}
                      onClick={() => navigate(`/user/edit/${user.id}`)}
                    />
                  );
                })
              ) : <CustomTableRow loading={loading} colSpan={3} typeTableRowText="usuário" />}
            </tbody>
          </table>
        </div>
      </section>
      {/* <Pagination /> */}
    </>
  );
}

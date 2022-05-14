import { useEffect, useState, MouseEvent } from "react";
import { FaArrowUp } from "react-icons/fa";

import UserComponent from "./UserComponent";
import { UserRequests } from "../utils/requests/User.requests";

import { User } from "../interfaces/user.interface";
import { OrderByTypes, SortUserTableTypes } from "../constants/sortTableEnum";

import "../styles/components/UserList.css";

export default function TicketList() {
  const userRequest = new UserRequests();

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
    const response: { content: [] } = await userRequest.listUserRequest(
      sorting
    );
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

  return (
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
                    role={user.role}
                    onClick={() => navigate(`../user/edit/${user.id}`)}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className="no-results">
                  Não foi encontrado nenhum usuário
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

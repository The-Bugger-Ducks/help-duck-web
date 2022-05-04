import "../styles/components/UserList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/user.interface";
import { UserRequests } from "../utils/requests/User.requests";
import UserComponent from "./UserComponent";

export default function TicketList() {
  const userRequest = new UserRequests();
  const [users, setUsers] = useState<User[]>();
  const navigate = useNavigate();

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const response: { content: [] } = await userRequest.listUserRequest();
    const users: User[] = response.content;
    setUsers(users);
  };

  return (
    <section className="user-list-container">
      <div className="grid-users">
        <table>
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo de usuário</th>
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

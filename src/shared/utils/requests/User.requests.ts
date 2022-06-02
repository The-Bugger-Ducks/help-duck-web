import { apiUsers } from "../../services/Api.service";
import { USER_ENDPOINTS } from "../../utils/endpoints";
import { validateStatus } from "../handlers/HandlerResponseStatusCodeFound";

export class UserRequests {
  public async showRequest(userId: string) {
    try {
      const response = await apiUsers.get(
        USER_ENDPOINTS.USER_DETAILS + userId,
        {
          validateStatus,
        }
      );
      return response.data;
    } catch (error) {
      alert("Não foi possível encontrar o usuario. Tente novamente!");
    }
  }

  public async loginRequest(body: object) {
    try {
      const response = await apiUsers.post(USER_ENDPOINTS.USER_LOGIN, body);
      return response.data;
    } catch (error) {
      console.log(error);
      alert("Email ou senha incorretos.");
    }
  }

  public async registerRequest(body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "admin" | "support" | "client";
  }) {
    try {
      const response = await apiUsers.post(USER_ENDPOINTS.USER_REGISTER, body);
      return response;
    } catch (error) {
      console.log(error);
      alert("Não foi possível cadastrar usuário");
    }
  }

  public async updateRequest(body: object) {
    try {
      const response = await apiUsers.put(USER_ENDPOINTS.USER_UPDATE, body);
      return response;
    } catch (error) {
      console.log(error);
      alert("Não foi possível atualizar dados do usuário");
    }
  }

  public async deleteRequest(userId: string) {
    try {
      const response = await apiUsers.delete(
        USER_ENDPOINTS.USER_DELETE + userId
      );
      return response;
    } catch (error) {
      alert("Não foi possível deletar o usuario. Tente novamente!");
    }
  }

  public async listUserRequest(sorting?: string) {
    let url = `${USER_ENDPOINTS.USER_DETAILS}`;

    if (sorting) {
      url = `${USER_ENDPOINTS.USER_DETAILS}?${sorting}`;
    }

    try {
      const response = await apiUsers.get(url, {
        validateStatus,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      alert("Não foi possível buscar todos usuários.");
    }
  }

  public async updatePassword(body: object) {
    let url = `${USER_ENDPOINTS.USER_UPDATE_PASSWORD}`;

    try {
      const response = await apiUsers.put(url, body);
      return response;
    } catch (error) {
      console.log(error);
      alert(
        "A senha informada está incorreta. Não foi possível atualizar as informações."
      );
    }
  }

  public async searchUsers(username: string, role: string, sorting?: string) {
    try {
      let url = `${USER_ENDPOINTS.USER_SEARCH}`

      if (username.length != 0 && role.length != 0) {
        url += `?username=${username}&role=${role}`
      } else if (username.length != 0 && role.length == 0) {
        url += `?username=${username}`
      } else if (role.length != 0 && username.length == 0) {
        url += `?role=${role}`
      }

      if (sorting && role.length == 0 && username.length == 0) {
        url += `?${sorting}`;
      } else if (sorting) {
        url += `&${sorting}`;
      }

      const { data } = await apiUsers.get(url, { validateStatus });

      return data
    } catch (error) {
      alert("Não foi possível realizar filtro, tente novamente!")
    }
  }
}

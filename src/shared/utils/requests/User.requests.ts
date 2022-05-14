import { apiUsers } from "../../services/Api.service";
import { USER_ENDPOINTS } from "../../utils/endpoints";
import { validateStatus } from "../handlers/HandlerResponseStatusCodeFound";

export class UserRequests {  
  public async showRequest(userId: string) {
  try {
    const response = await apiUsers.get(USER_ENDPOINTS.USER_DETAILS + userId, {
      validateStatus,
    });
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
      const response = await apiUsers.delete(USER_ENDPOINTS.USER_DELETE + userId);
      return response;
    } catch (error) {
      alert("Não foi possível deletar o usuario. Tente novamente!");
    }
  }

  public async listUserRequest(sorting?: string) {
    let url = `${USER_ENDPOINTS.USER_DETAILS}`

    if (sorting) {
      url = `${USER_ENDPOINTS.USER_DETAILS}?${sorting}`
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
}

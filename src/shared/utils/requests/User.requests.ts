import { apiAuth, apiUsers } from "../../services/Api.service";
import { USER_ENDPOINTS } from "../../utils/endpoints";
import validateStatus from "../handlers/HandlerResponseStatusCodeFound";

export class UserRequests {
  public async loginRequest(body: object) {
    try {
      const response = await apiAuth.post(USER_ENDPOINTS.USER_LOGIN, body);
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
      const response = await apiUsers.post(USER_ENDPOINTS.USER_UPDATE, body);
      return response.data;
    } catch (error) {
      console.log(error);
      alert("Não foi possível atualizar dados do usuário");
    }
  }

  public async listUserRequest() {
    try {
      const response = await apiUsers.get(`/users/`, {
        validateStatus,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      alert("Email ou senha incorretos.");
    }
  }
}

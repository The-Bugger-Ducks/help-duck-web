import User from "../../interfaces/user.interface";
import { UserRequests } from "../requests/User.requests";

export default class HandleUserFormData {
  public handleLogin(user: User) {
    let body = {
      email: user.email,
      password: user.password,
      name: user.name ? user.name : null,
      lastname: user.lastname ? user.lastname : null,
      role: user.profileType ? user.profileType : null,
    };

    let userRequests = new UserRequests();
    userRequests.loginRequest(body);
  }
}

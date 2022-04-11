import User from "../../interfaces/user.interface";
import { UserRequests } from "../requests/User.requests";

export default class HandleUserFormData {
  public handleLogin(user: User) {
    let body = {
      email: user.email,
      password: user.password,
      firstName: user.firstName ? user.firstName : null,
      lastName: user.lastName ? user.lastName : null,
      role: user.profileType ? user.profileType : null,
    };

    let userRequests = new UserRequests();
    userRequests.loginRequest(body);
  }

  public handleRegister(user: User) {
    let body = {
      email: user.email,
      password: user.password,
      firstName: user.firstName ? user.firstName : null,
      lastName: user.lastName ? user.lastName : null,
      role: user.profileType ? user.profileType : null,
    };

    let userRequests = new UserRequests();
    userRequests.registerRequest(body);
  }

  public handleUpdate(user: User) {
    let body = {
      email: user.email,
      password: user.password,
      name: user.firstName ? user.firstName : null,
      lastName: user.lastName ? user.lastName : null,
      role: user.profileType ? user.profileType : null,
    };

    let userRequests = new UserRequests();
    userRequests.updateRequest(body);
  }
}

import User from "../interfaces/user.interface";
import SendingToBack from "./SendingToBack.service";

export default class HandleFormData {
  public handleFormData(user: User) {
    let sendingToBack = new SendingToBack();
    let body = {
      email: user.email,
      password: user.password,
      name: user.name ? user.name : null,
      lastname: user.lastname ? user.lastname : null,
      profileType: user.profileType ? user.profileType : null,
    };

    sendingToBack.sending("url", "POST", "JSON", body);
  }
}

export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "support" | "client"
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  id: string
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "support" | "client"
}

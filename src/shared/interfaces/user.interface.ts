export default interface User {
  id?: string
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  profileType?: string;
  role?: "admin" | "support" | "user"
}

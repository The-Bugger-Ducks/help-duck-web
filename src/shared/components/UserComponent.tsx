import React from "react";

interface UserInformationProps {
  name: React.ReactElement | string;
  email: React.ReactElement | string;
  role: React.ReactElement | string;
  department: React.ReactElement | string;
  onClick?: () => void;
}

const UserComponent: React.FC<UserInformationProps> = ({
  name,
  email,
  role,
  department,
  onClick,
}) => {
  return (
    <tr onClick={onClick}>
      <td id="name">{name}</td>
      <td id="email">{email}</td>
      <td id="role">{role}</td>
      <td id="department">{department}</td>
    </tr>
  );
};

export default UserComponent;

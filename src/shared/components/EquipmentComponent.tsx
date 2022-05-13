import React from "react";

interface UserInformationProps {
  name: React.ReactElement | string;
  model: React.ReactElement | string;
  brand: React.ReactElement | string;
  type: React.ReactElement | string;
  department: React.ReactElement | string;
  onClick?: () => void;
}

const EquipmentComponent: React.FC<UserInformationProps> = ({
  name,
  model,
  brand,
  type,
  department,
  onClick,
}) => {
  return (
    <tr onClick={onClick}>
      <td id="name">{name}</td>
      <td>{model}</td>
      <td>{brand}</td>
      <td>{type}</td>
      <td>{department}</td>
    </tr>
  );
};

export default EquipmentComponent;

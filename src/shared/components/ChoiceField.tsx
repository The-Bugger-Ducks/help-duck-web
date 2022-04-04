import React from "react";
interface Props {
  backgroundColor?: string;
  border?: string;
  name?: string;
  radius?: string;
  width?: string;
  required?: boolean;
  padding?: string;
  onChange?: (event: any) => void;
}

const SelectInput: React.FC<Props> = ({
  backgroundColor = "#f2f2f3",
  border = "1px solid #CED4DA",
  name = "",
  radius = "0.3rem",
  width = "100%",
  required = true,
  padding = "0.5rem",
  onChange,
}) => {
  return (
    <div>
    <select
      onChange={onChange}
      style={{
        backgroundColor: backgroundColor,
        border,
        borderRadius: radius,
        width,
        padding,
      }}
      className="input-primary"
      name={name}
      required={required}
    >
      <option value="client" selected>Cliente</option>
      <option value="support">Suporte</option>
      <option value="admin">Administrador</option>
    </select>
    </div>
  );
};

export default SelectInput;

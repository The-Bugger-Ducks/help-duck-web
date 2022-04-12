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
  items: Array<{ value: string; label: string; selected?: boolean }>;
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
  items,
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
        <option value="" selected>
          Selecione uma opção
        </option>
        {items.map((item, index) => (
          <option key={index} value={item.value} selected={item.selected}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;

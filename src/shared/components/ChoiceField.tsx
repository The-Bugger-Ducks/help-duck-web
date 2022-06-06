import React from "react";
interface Props {
  disabled?: boolean;
  backgroundColor?: string;
  color?: string;
  border?: string;
  borderRight?: string;
  outline?: string;
  name?: string;
  radius?: string;
  width?: string;
  height?: string;
  required?: boolean;
  padding?: string;
  onChange?: (event: any) => void;
  items: Array<{ value: string; label: string; selected?: boolean }>;
}

const SelectInput: React.FC<Props> = ({
  disabled = false,
  backgroundColor = !disabled ? "#FAFAFA" : "#EDEDEE",
  outline = "1px solid #CED4DA",
  name = "",
  radius = "0.3rem",
  width = "100%",
  color = "#495057",
  height = "50px",
  required = true,
  padding = "0.5rem",
  border = "0",
  borderRight = "16px solid transparent",
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
          borderRight,
          outline,
          borderRadius: radius,
          width,
          padding: `${padding} 0.5rem`,
          height,
          fontSize: "16px",
          color,
        }}
        className="input-primary"
        name={name}
        required={required}
        disabled={disabled}
      >
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

import React from "react";
interface Props {
  backgroundColor?: string;
  color?: string;
  height?: string;
  border?: string;
  type?: any;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  radius?: string;
  width?: string;
  required?: boolean;
  padding?: string;
  disabled?: boolean;
  onChange?: (event: any) => void;
  title?: string;
}

const TextInput: React.FC<Props> = ({
  disabled = false,
  backgroundColor = !disabled ? "#FAFAFA" : "#EDEDEE",
  border = "1px solid #CED4DA",
  type = "text",
  name = "",
  placeholder = "",
  defaultValue,
  radius = "0.3rem",
  width = "100%",
  color = "#495057",
  height = "50px",
  required = true,
  padding = "0.5rem",
  onChange,
  title,
}) => {
  return (
    <input
      title={title}
      onChange={onChange}
      style={{
        backgroundColor: backgroundColor,
        border,
        borderRadius: radius,
        width,
        padding,
        height,
        fontSize: "16px",
        color,
      }}
      className="input-primary"
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  );
};

export default TextInput;

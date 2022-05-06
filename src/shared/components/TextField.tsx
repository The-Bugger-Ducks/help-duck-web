import React from "react";
interface Props {
  backgroundColor?: string;
  border?: string;
  type?: any;
  name?: string;
  placeholder?: string;
  radius?: string;
  width?: string;
  required?: boolean;
  padding?: string;
  disabled?: boolean;
  onChange?: (event: any) => void;
}

const TextInput: React.FC<Props> = ({
  disabled = false,
  border = "1px solid #CED4DA",
  backgroundColor = !disabled ? "#f2f2f3" : "#e2e2e2",
  type = "text",
  name = "",
  placeholder = "",
  radius = "0.3rem",
  width = "100%",
  required = true,
  padding = "0.5rem",
  onChange,
}) => {
  return (
    <input
      onChange={onChange}
      style={{
        backgroundColor: backgroundColor,
        border,
        borderRadius: radius,
        width,
        padding,
      }}
      className="input-primary"
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default TextInput;

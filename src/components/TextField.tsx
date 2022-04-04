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
  onChange?: (event: any) => void;
}

const TextInput: React.FC<Props> = ({
  backgroundColor = "#f2f2f3",
  border = "1px solid #CED4DA",
  type = "email",
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
    />
  );
};

export default TextInput;

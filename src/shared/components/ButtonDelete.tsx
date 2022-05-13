import React from "react";
import "../styles/components/ButtonDelete.css";

interface Props {
  backgroundColor?: string;
  border?: string;
  color?: string;
  children?: React.ReactNode;
  height?: string;
  onClick?: () => void;
  radius?: string;
  width?: string;
  type?: any;
  fontSize?: string;
  fontWeight?: string;
}

const Button: React.FC<Props> = ({
  border = "none",
  backgroundColor = "#F25050",
  color = "#FAFAFA",
  children,
  height = "42px",
  onClick,
  radius = "0.3rem",
  width = "17rem",
  type = "button",
  fontSize = "1rem",
  fontWeight = "600",
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor,
        color: color,
        border,
        borderRadius: radius,
        height,
        width,
        fontSize,
        fontWeight,
      }}
      className="button-secondary"
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

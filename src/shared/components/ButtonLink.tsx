import React from "react";
import "../styles/components/ButtonLink.css";

interface Props {
  color?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: any;
  fontSize?: string;
  fontWeight?: string;
}

const ButtonLink: React.FC<Props> = ({
  children,
  onClick,
  type = "button",
  fontSize = "0.9rem",
  fontWeight = "400",
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize,
        fontWeight,
      }}
      type={type}
      className="button-link"
    >
      {children}
    </button>
  );
};

export default ButtonLink;

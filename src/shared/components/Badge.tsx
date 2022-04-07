import React from "react";

interface Props {
  backgroundColor?: string;
  border?: string;
  radius?: string;
  width?: string;
  height?: string;
  color?: string;
  textAlign?: string;
  label: string;
}

const Badge: React.FC<Props> = ({
  backgroundColor = "var(--color-white-light)",
  border = "1px solid var(--color-primary-dark)",
  radius = "0.5rem",
  width = "fit-content",
  height = "auto",
  color = "var(--color-primary-dark)",
  textAlign = "center" as "center",
  label = "",
}) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        border,
        borderRadius: radius,
        width,
        height,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1rem",
        fontSize: "0.8rem",
      }}
    >
      {label}
    </div>
  );
};

export default Badge;

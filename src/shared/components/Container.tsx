import React from "react";
import "../styles/components/Container.css";

interface Props {
  children?: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return <div id="component-container">{children}</div>;
};

export default Container;

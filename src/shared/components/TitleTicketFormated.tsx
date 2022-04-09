import React from "react";

interface titleProps {
  title: string;
}

const TitleTicketFormated: React.FC<titleProps> = ({ title = "" }) => {
  return title.length > 30 ? (
    <p>{title.slice(0, 30) + "..."}</p>
  ) : (
    <p>{title}</p>
  );
};

export default TitleTicketFormated;

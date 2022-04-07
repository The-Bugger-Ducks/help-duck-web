import { FiFlag } from "react-icons/fi";

const StatusTicket: React.FC<{ status: string }> = ({ status }) => {
  const label =
    status === "underAnalysis"
      ? "Em análise"
      : status === "waiting"
      ? "Aguardando"
      : status === "notSolved"
      ? "Não resolvido"
      : "Resolvido";

  return (
    <span className={status}>
      <FiFlag color="var(--color-gray-dark)" size="0.8rem" /> {label}
    </span>
  );
};

export default StatusTicket;

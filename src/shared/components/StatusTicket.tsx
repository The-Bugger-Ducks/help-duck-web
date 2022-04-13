import { FiFlag } from "react-icons/fi";

const StatusTicket: React.FC<{ status: string | undefined }> = ({ status }) => {
  const ticketDone = {
    label: "Resolvido",
    color: "var(--color-green)",
  };

  const ticketUnderAnalysis = {
    label: "Em análise",
    color: "var(--color-yellow)",
  };

  const ticketWaiting = {
    label: "Aguardando",
    color: "var(--color-yellow)",
  };

  const ticketNotSolved = {
    label: "Não resolvido",
    color: "var(--color-red)",
  };

  const ticketStatus =
    status === "underAnalysis"
      ? ticketUnderAnalysis
      : status === "done"
      ? ticketDone
      : ticketWaiting;

  return (
    <span style={{ color: ticketStatus.color }}>
      <FiFlag color={ticketStatus.color} size="0.8rem" /> {ticketStatus.label}
    </span>
  );
};

export default StatusTicket;

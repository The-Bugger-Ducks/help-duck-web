import Ticket from "../interfaces/ticket.interface";
import Badge from "./Badge";

const PriorityLevelBadge: React.FC<{ 
  priority: Ticket["priorityLevel"],   
  handlePriorityLevel?: () => Promise<void>,
  className?: string | undefined
}> = ({
  priority = "low",
  handlePriorityLevel,
  className,
}) => {
  const high = {
    label: "ALTA",
    color: "var(--color-red)",
  };

  const medium = {
    label: "MÉDIA",
    color: "var(--color-yellow)",
  };

  const low = {
    label: "BAIXA",
    color: "var(--color-green)",
  };

  const priorityBadge =
    priority === "high" ? high : priority === "medium" ? medium : low;

  return (
    <Badge
      label={priorityBadge.label}
      border={`1px solid ${priorityBadge.color}`}
      color={priorityBadge.color}
      handlePriorityLevel={handlePriorityLevel}
      className={className}
    />
  );
};

export default PriorityLevelBadge;

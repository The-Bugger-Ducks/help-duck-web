import Ticket from "../interfaces/ticket.interface";
import Badge from "./Badge";

const PriorityLevelBadge: React.FC<{ 
  priority: Ticket["priorityLevel"],   
  className?: string | undefined
}> = ({
  priority = "low",
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
      className={className}
    />
  );
};

export default PriorityLevelBadge;

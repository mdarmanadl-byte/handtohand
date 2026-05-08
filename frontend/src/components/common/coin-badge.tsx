import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

export function CoinBadge({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <Badge
      variant="coin"
      className={cn("gap-1.5 px-3 py-1.5 text-xs font-semibold", className)}
    >
      <Coins className="h-3.5 w-3.5" />
      {value} coins
    </Badge>
  );
}

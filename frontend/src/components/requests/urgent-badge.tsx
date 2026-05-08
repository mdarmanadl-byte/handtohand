import { Siren } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function UrgentBadge() {
  return (
    <Badge variant="urgent" className="gap-1.5 px-3 py-1.5 text-[11px] font-semibold">
      <Siren className="h-3.5 w-3.5" />
      Urgent
    </Badge>
  );
}

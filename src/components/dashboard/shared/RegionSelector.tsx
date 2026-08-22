import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REGIONS } from "@/data/regions";

export function RegionSelector({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (regionId: string) => void;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className ?? "w-[220px]"}>
        <SelectValue placeholder="Select a region" />
      </SelectTrigger>
      <SelectContent>
        {REGIONS.map((r) => (
          <SelectItem key={r.id} value={r.id}>
            {r.name}, {r.state}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

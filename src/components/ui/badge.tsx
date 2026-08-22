import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/[0.04] text-ink-200",
        aurora: "border-aurora/30 bg-aurora/10 text-aurora",
        signal: "border-signal/30 bg-signal/10 text-signal",
        success: "border-aqi-good/30 bg-aqi-good/10 text-aqiText-good",
        warning: "border-aqi-moderate/30 bg-aqi-moderate/10 text-aqiText-moderate",
        danger: "border-aqi-unhealthy/30 bg-aqi-unhealthy/10 text-aqiText-unhealthy",
        critical: "border-aqi-hazardous/30 bg-aqi-hazardous/10 text-aqiText-hazardous",
        outline: "border-white/15 text-ink-300",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

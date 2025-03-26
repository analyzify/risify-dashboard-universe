
import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  href: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        className={cn(
          "text-primary underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Link.displayName = "Link";

export { Link };

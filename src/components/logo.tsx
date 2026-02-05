import { Popcorn } from "lucide-react";

export const Logo = () => (
  <>
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
      <Popcorn className="h-5 w-5" />
    </div>
    <span className="font-semibold uppercase italic tracking-wide">
      Popcorn
    </span>
  </>
);

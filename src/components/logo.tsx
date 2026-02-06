import { Popcorn } from "lucide-react";

export const Logo = () => (
  <>
    <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-9 w-9 items-center justify-center rounded-md transition-colors">
      <Popcorn className="h-5 w-5" />
    </div>
    <span className="font-semibold tracking-wide uppercase italic">
      Popcorn
    </span>
  </>
);

"use client";

import { Button } from "~/components/ui/button";
import { Logo } from "~/components/logo";
import Link from "next/link";
import { Bookmark, LogOut } from "lucide-react";
import { SearchBar } from "./search-bar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { status } = useSession();

  return (
    <nav className="bg-background h-16 border-b">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <div className="flex items-center gap-1">
            <Logo />
            {/* Desktop Menu */}
            {/* <NavMenu className="hidden md:block" /> */}
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <SearchBar />
          {status === "unauthenticated" ? (
            <>
              <Link href="/login">
                <Button className="hidden sm:inline-flex" variant="outline">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/watchlist"
                className="text-foreground hover:bg-accent flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <Tooltip>
                  <TooltipTrigger>
                    <Bookmark className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>My Watchlist</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
              <div
                className="text-foreground hover:bg-accent flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                onClick={async () => {
                  await signOut();
                }}
              >
                <Tooltip>
                  <TooltipTrigger>
                    <LogOut className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

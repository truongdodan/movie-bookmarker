import { Button } from "~/components/ui/button";
import { Logo } from "~/components/logo";
import { NavMenu } from "~/components/nav-menu";
import { NavigationSheet } from "~/components/navigation-sheet";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { Bookmark } from "lucide-react";

const Navbar = async () => {
    const session = await getServerAuthSession();

    return (
    <nav className="h-16 border-b bg-background">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <div className="flex items-center gap-12">
          <Logo />

          {/* Desktop Menu */}
          {/* <NavMenu className="hidden md:block" /> */}
        </div>
        </Link>

        <div className="flex items-center gap-3">
          {!session?.user 
              ? <>
                  <Link href="/login">
                  <Button className="hidden sm:inline-flex" variant="outline">
                    Sign In
                  </Button>
                  </Link>
                  <Link href="/register"><Button>Sign Up</Button></Link>
                </>
              : <Link
                  href="/watchlist"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <Bookmark className="h-4 w-4" />
                  My Watchlist
                </Link>
          }
          {/* <Button size="icon" variant="outline">
            <SunIcon />
          </Button> */}

          {/* Mobile Menu */}
          {/* <div className="md:hidden">
            <NavigationSheet />
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

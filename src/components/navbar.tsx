import { Button } from "~/components/ui/button";
import { Logo } from "~/components/logo";
import { NavMenu } from "~/components/nav-menu";
import { NavigationSheet } from "~/components/navigation-sheet";
import Link from "next/link";

const Navbar = () => {
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
          <Link href="/register">
            <Button className="hidden sm:inline-flex" variant="outline">
              Sign In
            </Button>
          </Link>
          <Link href="/login"><Button>Sign Up</Button></Link>
          {/* <Button size="icon" variant="outline">
            <SunIcon />
          </Button> */}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

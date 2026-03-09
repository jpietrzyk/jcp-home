import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { BackgroundEffects } from "../components/BackgroundEffects";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/blog", label: "Blog" },
];

export function MainLayout() {
  return (
    <div className="min-h-screen bg-dark-950 text-zinc-100">
      <BackgroundEffects />
      <header className="border-b border-dark-800 bg-dark-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link className="text-lg font-semibold gradient-text" to="/">
            jcp.home
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                className={({ isActive }) =>
                  cn(isActive ? "text-zinc-100" : "text-zinc-400")
                }
                to={link.to}
              >
                {({ isActive }) => (
                  <Button
                    className="h-8 px-3 transition-all duration-300"
                    size="sm"
                    variant={isActive ? "default" : "ghost"}
                  >
                    {link.label}
                  </Button>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

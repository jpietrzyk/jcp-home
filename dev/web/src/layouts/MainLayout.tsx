import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/blog", label: "Blog" },
  { to: "/music", label: "Music" },
];

export function MainLayout() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-200">
      <header className="border-b border-stone-700/50 bg-stone-900/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            className="text-lg font-semibold text-stone-100 hover:text-stone-300 transition-colors duration-300"
            to="/"
          >
            jcp.home
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                className={({ isActive }) =>
                  cn(
                    isActive
                      ? "text-stone-100"
                      : "text-stone-400 hover:text-stone-300",
                  )
                }
                to={link.to}
              >
                {({ isActive }) => (
                  <Button
                    className="h-8 px-3 transition-all duration-400"
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

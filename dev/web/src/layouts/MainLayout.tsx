import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { ThemeToggle } from "../components/ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/blog", label: "Blog" },
  { to: "/music", label: "Music" },
];

export function MainLayout() {
  return (
    <div className="min-h-screen bg-light-50 text-stone-900 dark:bg-stone-950 dark:text-stone-200">
      <header className="border-b border-stone-200 bg-light-100/80 backdrop-blur-sm dark:border-stone-700/50 dark:bg-stone-900/80">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            className="text-lg font-semibold text-stone-900 hover:text-stone-700 transition-colors duration-300 dark:text-stone-100 dark:hover:text-stone-300"
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
                      ? "text-stone-900 dark:text-stone-100"
                      : "text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-300",
                  )
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
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

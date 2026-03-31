import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { ThemeToggle } from "../components/ThemeToggle";
import { JcpLogo } from "../components/JcpLogo";
import { profile } from "../content/profile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  User,
  FileText,
  FolderKanban,
  BookOpen,
  Music,
  Mail,
} from "lucide-react";

// Brand icons as inline SVG components (lucide doesn't provide brand icons)
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: User },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/blog", label: "Blog", icon: BookOpen },
  { to: "/music", label: "Music", icon: Music },
];

const socialLinks = [
  {
    href: profile.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon,
    ariaLabel: "LinkedIn Profile",
  },
  {
    href: profile.github,
    label: "GitHub",
    icon: GitHubIcon,
    ariaLabel: "GitHub Profile",
  },
  {
    href: `mailto:${profile.email}`,
    label: "Email",
    icon: Mail,
    ariaLabel: "Send Email",
  },
];

export function MainLayout() {
  const location = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-stone-200/50 bg-sidebar/80 backdrop-blur-sm dark:border-stone-800/30">
        <SidebarHeader className="border-b border-stone-200/50 dark:border-stone-800/30">
          <Link
            to="/"
            aria-label="JCP Home"
            className="inline-flex items-center px-1.5 py-1 rounded-md hover:bg-stone-100/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 focus-visible:ring-offset-light-100 dark:hover:bg-stone-800/60 dark:focus-visible:ring-offset-dark-900"
          >
            <JcpLogo className="h-8 w-auto" aria-hidden="true" />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link) => (
                  <SidebarMenuItem key={link.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={link.to === location.pathname || (link.to !== "/" && location.pathname.startsWith(link.to))}
                      className="transition-colors duration-300 h-12 text-base"
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                      >
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel className="text-sm font-semibold text-stone-500 dark:text-stone-400">
              Connect
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {socialLinks.map((link) => (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      asChild
                      className="h-12 text-base"
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.ariaLabel}
                      >
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-stone-200/50 dark:border-stone-800/30">
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-stone-200/50 bg-sidebar/80 backdrop-blur-sm dark:border-stone-800/30 px-4">
          <SidebarTrigger className="-ml-1 text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100" />
          <div className="flex-1" />
        </header>
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl px-4 py-10 min-h-[80dvh]">
            <Outlet />
          </div>
        </div>
        <footer className="border-t border-stone-200/50 bg-sidebar/80 backdrop-blur-sm dark:border-stone-800/30">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Brand and Copyright */}
              <div className="space-y-4">
                <Link
                  to="/"
                  aria-label="JCP Home"
                  className="inline-flex items-center px-1.5 py-1 rounded-md hover:bg-stone-100/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 focus-visible:ring-offset-light-100 dark:hover:bg-stone-800/60 dark:focus-visible:ring-offset-dark-900"
                >
                  <JcpLogo className="h-8 w-auto" aria-hidden="true" />
                </Link>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  © {new Date().getFullYear()} {profile.name}. All rights
                  reserved.
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {profile.location}
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3
                  id="footer-quick-links-heading"
                  className="text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                  Quick Links
                </h3>
                <nav
                  className="flex flex-col gap-2"
                  aria-labelledby="footer-quick-links-heading"
                >
                  {links.map((link) => (
                    <NavLink
                      key={link.to}
                      className={({ isActive }) =>
                        cn(
                          "text-sm transition-colors duration-300",
                          isActive
                            ? "text-stone-900 dark:text-stone-100"
                            : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300",
                        )
                      }
                      to={link.to}
                      end={link.to === "/"}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Contact and Social */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  Connect
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    className="text-sm text-stone-600 hover:text-stone-900 transition-colors duration-300 dark:text-stone-400 dark:hover:text-stone-300"
                    href={`mailto:${profile.email}`}
                  >
                    {profile.email}
                  </a>
                  <div className="flex gap-4">
                    <a
                      className="text-stone-600 hover:text-stone-900 transition-colors duration-300 dark:text-stone-400 dark:hover:text-stone-300"
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      className="text-stone-600 hover:text-stone-900 transition-colors duration-300 dark:text-stone-400 dark:hover:text-stone-300"
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Top */}
            <div className="mt-8 border-t border-stone-200/50 pt-6 dark:border-stone-800/30">
              <Button
                className="w-full md:w-auto"
                variant="ghost"
                onClick={scrollToTop}
              >
                Back to top ↑
              </Button>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}

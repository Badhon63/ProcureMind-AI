"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  LogOut,
  Compass,
  PlusCircle,
  LayoutDashboard,
  BrainCircuit,
  Info,
  Phone,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    toast.success("Logged out successfully!");
    setMobileOpen(false);
  };

  const navLinkClass = (href: string) => {
    const active =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);

    return `flex items-center gap-1.5 rounded-md px-3 py-2 transition ${
      active
        ? "bg-gray-100 text-black"
        : "text-gray-600 hover:bg-gray-100 hover:text-black"
    }`;
  };

  const mobileLinkClass = (href: string) => {
    return `${navLinkClass(href)} w-full`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 px-6 py-4 select-none">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="font-extrabold text-xl text-gray-950 tracking-tight flex items-center gap-2"
        >
          <span className="px-2.5 py-2 bg-slate-950 text-white rounded-lg text-xs">
            AI
          </span>
          ProcureMind
        </Link>

        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <Link href="/explore" className={navLinkClass("/explore")}>
            <Compass className="w-4 h-4" />
            Explore RFPs
          </Link>

          {session?.user && (
            <>
              <Link href="/items/add" className={navLinkClass("/items/add")}>
                <PlusCircle className="w-4 h-4" />
                Add Request
              </Link>

              <Link
                href="/items/manage"
                className={navLinkClass("/items/manage")}
              >
                <LayoutDashboard className="w-4 h-4" />
                Manage
              </Link>

              <Link href="/insights" className={navLinkClass("/insights")}>
                <BrainCircuit className="w-4 h-4" />
                AI Insights
              </Link>
            </>
          )}

          <Link href="/about" className={navLinkClass("/about")}>
            <Info className="w-4 h-4" />
            About
          </Link>

          {!session?.user && (
            <Link href="/contact" className={navLinkClass("/contact")}>
              <Phone className="w-4 h-4" />
              Contact
            </Link>
          )}
        </div>

        <div className="hidden lg:block">
          {isPending ? (
            <Loader2 className="w-7 h-7 animate-spin" />
          ) : session?.user ? (
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex flex-col leading-none">
                  <span className="max-w-32 truncate text-sm font-semibold">
                    {session.user.name}
                  </span>

                  <span className="max-w-40 truncate text-xs text-gray-500">
                    {session.user.email}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-red-600 transition cursor-pointer"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-slate-950 text-white px-4 py-2 text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden mt-4 border-t border-gray-200 pt-4 space-y-2">
          <Link
            href="/explore"
            className={mobileLinkClass("/explore")}
            onClick={() => setMobileOpen(false)}
          >
            <Compass className="w-4 h-4" />
            Explore RFPs
          </Link>

          {session?.user && (
            <>
              <Link
                href="/items/add"
                className={mobileLinkClass("/items/add")}
                onClick={() => setMobileOpen(false)}
              >
                <PlusCircle className="w-4 h-4" />
                Add Request
              </Link>

              <Link
                href="/items/manage"
                className={mobileLinkClass("/items/manage")}
                onClick={() => setMobileOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                Manage
              </Link>

              <Link
                href="/insights"
                className={mobileLinkClass("/insights")}
                onClick={() => setMobileOpen(false)}
              >
                <BrainCircuit className="w-4 h-4" />
                AI Insights
              </Link>
            </>
          )}

          <Link
            href="/about"
            className={`${mobileLinkClass("/about")} hidden`}
            onClick={() => setMobileOpen(false)}
          >
            <Info className="w-4 h-4" />
            About
          </Link>

          <Link
            href="/contact"
            className={`${mobileLinkClass("/contact")} hidden`}
            onClick={() => setMobileOpen(false)}
          >
            <Phone className="w-4 h-4" />
            Contact
          </Link>

          {session?.user ? (
            <div className="flex justify-between">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-red-600 rounded-md hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
              <div className="flex items-center gap-2">
                <span className="max-w-32 truncate text-sm text-gray-600 font-semibold">
                  {session.user.name}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link
                href="/login"
                className="flex-1 text-center border rounded-lg py-2"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="flex-1 text-center bg-slate-950 text-white rounded-lg py-2"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

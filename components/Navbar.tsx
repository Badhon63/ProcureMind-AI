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
} from "lucide-react";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    toast.success("Logged out successfully!");
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

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between select-none">
      <Link
        href="/"
        className="font-extrabold text-xl text-gray-950 tracking-tight flex items-center gap-2"
      >
        <span className="px-2.5 py-2 bg-slate-950 text-white rounded-lg text-xs">
          AI
        </span>{" "}
        ProcureMind
      </Link>

      <div className="flex items-center gap-1 text-sm font-medium select-none">
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

        <Link href="/contact" className={navLinkClass("/contact")}>
          <Phone className="w-4 h-4" />
          Contact
        </Link>
      </div>

      <div>
        {isPending ? (
          <Loader2 className="w-7 h-7 text-black animate-spin" />
        ) : session?.user ? (
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="select-none flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col leading-none">
                <span className="max-w-32 truncate text-sm font-semibold text-gray-900">
                  {session.user.name}
                </span>
                <span className="max-w-40 truncate text-xs text-gray-500">
                  {session.user.email}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg hover:outline outline-gray-200 p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-600 cursor-pointer"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

import Link from "next/link";
import { HiBriefcase } from "react-icons/hi";
import { HiCog6Tooth } from "react-icons/hi2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <div className="w-full h-16 flex shrink-0 justify-between items-center px-8 sticky top-0">
        <Link href="/dashboard">
          <img src="/brand.svg" className="h-5 object-contain" />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/portfolio"
            className="border-2 p-1 rounded-full active:scale-90 transition-transform duration-150 bg-white"
          >
            <HiBriefcase className="text-lg text-neutral-400" />
          </Link>
          <Link
            href="/dashboard/settings"
            className="border-2 p-1 rounded-full active:scale-90 transition-transform duration-150 bg-white"
          >
            <HiCog6Tooth className="text-lg text-neutral-400" />
          </Link>
        </div>
      </div>
      <div className="flex-1 border-t-2 border-neutral-100 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

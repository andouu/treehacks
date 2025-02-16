import Link from "next/link";
import { HiCog6Tooth } from "react-icons/hi2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full h-16 flex shrink-0 justify-between items-center px-8 sticky top-0 bg-white/50 backdrop-blur-sm drop-shadow-sm">
        <Link href="/dashboard">
          <img src="/brand.svg" className="h-5 object-contain" />
        </Link>
        <Link
          href="/dashboard/settings"
          className="border-2 p-1 rounded-full active:scale-90 transition-transform duration-150 bg-white"
        >
          <HiCog6Tooth className="text-lg text-neutral-400" />
        </Link>
      </div>
      <div className="border-t-2 border-neutral-100">{children}</div>
    </div>
  );
}

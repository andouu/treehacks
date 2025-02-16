"use client";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link
        href="/"
        className="fixed z-10 top-5 left-5 px-4 py-2 rounded-full border-2 border-neutral-100 bg-white active:scale-95 transition-transform duration-150"
      >
        <img src="/brand.svg" className="h-5 object-contain" />
      </Link>
      {children}
    </>
  );
}

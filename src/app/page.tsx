"use client";
import Link from "next/link";
import { useAuth } from "./Context/Auth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="w-full">
      <div className="w-full h-screen flex flex-col">
        <div className="w-full h-20 flex justify-between items-center px-8">
          <img src="/brand.svg" className="h-6 object-contain" />
          {user ? (
            <Link href="/dashboard">
              <button className="px-5 py-2 rounded-full border-2 border-neutral-100 bg-white active:scale-95 transition-transform duration-150">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="px-5 py-2 rounded-full border-2 border-neutral-100 bg-white active:scale-95 transition-transform duration-150"
            >
              Sign Up
            </Link>
          )}
        </div>
        <div
          className="fixed top-0 left-0 -z-10 w-full h-screen"
          style={{ filter: "blur(2px)" }}
        >
          {/* <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-transparent to-white" /> */}
          <img src="/bg.png" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex items-center justify-center mb-20">
          <span className="text-4xl">Democratized Trading.</span>
        </div>
      </div>
    </div>
  );
}

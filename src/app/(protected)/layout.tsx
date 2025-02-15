"use client";
import { permanentRedirect } from "next/navigation";
import { LoadingScreen } from "../Components/LoadingScreen";
import { useAuth } from "../Context/Auth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    permanentRedirect("/login");
  }

  return children;
}

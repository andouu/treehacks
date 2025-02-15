"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../Context/Auth";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

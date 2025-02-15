"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../Types/User";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
}>({ user: null, isLoading: false });

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return value;
};

const fetchAuth = async (): Promise<User | null> => {
  const auth = localStorage.getItem("auth");
  if (!auth) return null;
  const primitive = JSON.parse(auth);
  if (!primitive) return null;

  if (
    !(
      "name" in primitive &&
      "experience" in primitive &&
      "riskTolerance" in primitive &&
      "interests" in primitive
    )
  ) {
    return null;
  }

  return primitive as User;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authQuery = useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
  });

  console.log(authQuery.data);

  return (
    <AuthContext.Provider
      value={{ user: authQuery.data || null, isLoading: authQuery.isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

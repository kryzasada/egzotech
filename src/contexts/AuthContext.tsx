"use client";

import { ReactNode, createContext, useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  const login = () => {
    router.replace("/dashboard");
  };
  const logout = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

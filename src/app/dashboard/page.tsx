"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Dashboard } from "@/components/views/Dashboard";

export default function DashboardPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  setInterval(() => {
    console.log({ isLoggedIn, isLoading });

    return null;
  }, 1000);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || !isLoggedIn) {
    return null;
  }

  return <Dashboard />;
}

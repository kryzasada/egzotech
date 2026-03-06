"use client";

import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Flex, Spinner } from "@chakra-ui/react";
import { useCurrentUser } from "@/hooks/db";

export const AuthSpinner = ({
  children,
  isDashboard,
}: {
  children?: ReactNode;
  isDashboard?: boolean;
}) => {
  const { status } = useSession();
  const { isLoading: isUserDataLoading } = useCurrentUser();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    } else if (isDashboard && isLoggedIn && !isLoading) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, isLoading, router, isDashboard]);

  if (isLoading || !isLoggedIn || isUserDataLoading) {
    return (
      <Flex minH="100vh" bg="background" align="center" justify="center">
        <Spinner
          color="primary"
          size="xl"
          w={10}
          h={10}
          style={{ borderWidth: "5px" }}
        />
      </Flex>
    );
  }

  return <>{children}</>;
};

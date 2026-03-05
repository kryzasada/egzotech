"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Flex, Spinner } from "@chakra-ui/react";

export const AuthSpinner = ({
  children,
  isDashboard,
}: {
  children?: React.ReactNode;
  isDashboard?: boolean;
}) => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
    if (isDashboard && isLoggedIn && !isLoading) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, isLoading, router, isDashboard]);

  if (isLoading || !isLoggedIn) {
    return (
      <Flex minH="100vh" bg="background" align="center" justify="center">
        <Spinner
          color="primary"
          size="xl"
          w={"50px"}
          h={"50px"}
          style={{ borderWidth: "5px" }}
        />
      </Flex>
    );
  }

  return <>{children}</>;
};

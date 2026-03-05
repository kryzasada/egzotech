"use client";

import { Suspense, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { loginUserSchema } from "@/lib/validations/auth";
import { AuthFieldConfig, LOGIN_USER_ERROR_MESSAGE } from "@/types";
import {
  Alert,
  Box,
  Flex,
  For,
  Heading,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Button, Input } from "@/components/ui";

export const LoginForm = () => {
  return (
    <Suspense>
      <LoginFormContent />
    </Suspense>
  );
};

const LoginFormContent = () => {
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log({ isLoggedIn });

  useEffect(() => {
    if (error) {
      router.replace(`/login`);
    }
  }, [error, router]);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    const validation = loginUserSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirect: false,
    });

    if (result?.error) {
      setError(LOGIN_USER_ERROR_MESSAGE.InvalidEmailOrPassword);
      setIsLoading(false);
    } else {
      login();
    }
  };

  const FIELDS: AuthFieldConfig[] = [
    {
      label: "Email Address",
      type: "email",
      placeholder: "Enter email",
      value: email,
      onChange: setEmail,
      onValidationChange: setIsEmailValid,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: setPassword,
      isInvalid: !!error,
    },
  ];

  return (
    <VStack gap={8} align="stretch">
      <Heading size="lg" color="gray.800">
        Sign In
      </Heading>

      {error && (
        <Alert.Root status="error" borderRadius="md">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{error}</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      )}

      {searchParams.has("registered") && !error && (
        <Alert.Root status="success" borderRadius="md">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Register successful. Please login</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      )}

      <VStack gap={5}>
        <For each={FIELDS}>
          {(field) => (
            <Box w="full" key={field.label}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  {field.label}
                </Text>
              </Flex>
              <Input
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onValidationChange={field.onValidationChange}
                aria-invalid={field.isInvalid}
              />
            </Box>
          )}
        </For>
      </VStack>

      <Button
        disabled={!email || !password || !isEmailValid || isLoading}
        btnType="fill"
        variant="primary"
        size="lg"
        onClick={handleLogin}
      >
        {isLoading ? <Spinner size="md" /> : "Sign In"}
      </Button>

      <Text textAlign="center" fontSize="sm" color="gray.500">
        Don&apos;t have an account?{" "}
        <Link asChild color="#009CA6" fontWeight="semibold">
          <NextLink href="/register">Sign Up</NextLink>
        </Link>
      </Text>
    </VStack>
  );
};

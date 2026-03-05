"use client";

import { ComponentProps, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUserSchema } from "@/lib/validations";
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

type FormSubmitHandler = NonNullable<ComponentProps<typeof Box>["onSubmit"]>;

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      router.replace(`/login`);
    }
  }, [error, router]);

  const handleLogin: FormSubmitHandler = async (event) => {
    event?.preventDefault();
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
      router.replace("/dashboard");
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
    <Box as="form" onSubmit={handleLogin}>
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
                  onChange={(e) => field.onChange(e.target.value.trim())}
                  onValidationChange={field.onValidationChange}
                  aria-invalid={field.isInvalid}
                />
              </Box>
            )}
          </For>
        </VStack>

        <Button
          type="submit"
          disabled={!email || !password || !isEmailValid || isLoading}
          btnType="fill"
          variant="primary"
          size="lg"
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
    </Box>
  );
};

"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { registerUserFormSchema } from "@/lib/validations/auth";
import { AuthFieldConfig, REGISTER_USER_ERROR_MESSAGE } from "@/types";
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
import { useRegisterUser } from "../hooks/db/useRegisterUser";

export const RegisterForm = () => {
  const { mutate: registerUser, isPending } = useRegisterUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    setError("");

    const validation = registerUserFormSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      repeatPassword,
    });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    registerUser(validation.data, {
      onSuccess: () => {
        setError("");
        router.push("/login?registered");
      },
      onError: (error) => {
        console.error(error);
        setError(REGISTER_USER_ERROR_MESSAGE.RegisterError);
      },
    });
  };

  const FIELDS: AuthFieldConfig[] = [
    {
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      value: firstName,
      onChange: setFirstName,
    },
    {
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
      value: lastName,
      onChange: setLastName,
    },
    {
      label: "Email Address",
      type: "email",
      placeholder: "Enter email",
      value: email,
      onChange: setEmail,
      onValidationChange: setIsEmailValid,
      isInvalid: error === REGISTER_USER_ERROR_MESSAGE.UserAlreadyExists,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: setPassword,
      isInvalid: error === REGISTER_USER_ERROR_MESSAGE.PasswordWeek,
    },
    {
      label: "Repeat Password",
      type: "password",
      placeholder: "Repeat Password",
      value: repeatPassword,
      onChange: setRepeatPassword,
      isInvalid: error === REGISTER_USER_ERROR_MESSAGE.PasswordsDoNotMatch,
    },
  ];

  return (
    <VStack gap={8} align="stretch">
      <Heading size="lg" color="gray.800">
        Sign Up
      </Heading>

      {error && (
        <Alert.Root status="error" borderRadius="md">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{error}</Alert.Title>
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
        disabled={
          !email ||
          !password ||
          !repeatPassword ||
          !isEmailValid ||
          !firstName ||
          !lastName ||
          isPending
        }
        btnType="fill"
        variant="primary"
        size="lg"
        onClick={handleRegister}
      >
        {isPending ? <Spinner size="md" /> : "Sign Up"}
      </Button>

      <Text textAlign="center" fontSize="sm" color="gray.500">
        Already have an account?{" "}
        <Link asChild color="#009CA6" fontWeight="semibold">
          <NextLink href="/login">Sign In</NextLink>
        </Link>
      </Text>
    </VStack>
  );
};

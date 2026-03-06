"use client";

import { ComponentProps, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { REGISTER_USER_ERROR_MESSAGE } from "@/consts";
import { registerUserFormSchema } from "@/lib/validations";
import { AuthFieldConfig } from "@/types";
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
import { useRegisterUser } from "@/hooks/db";

type FormSubmitHandler = NonNullable<ComponentProps<typeof Box>["onSubmit"]>;

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

  const handleRegister: FormSubmitHandler = (event) => {
    event?.preventDefault();
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
        setError(error.message.toString());
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
    <Box as="form" onSubmit={handleRegister}>
      <VStack gap={8} align="stretch">
        <Heading size="lg" color="text">
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
                  <Text fontSize="sm" fontWeight="medium" color="textSecondary">
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
        >
          {isPending ? <Spinner size="md" /> : "Sign Up"}
        </Button>

        <Text textAlign="center" fontSize="sm" color="textSecondary">
          Already have an account?{" "}
          <Link asChild color="primary" fontWeight="semibold">
            <NextLink href="/login">Sign In</NextLink>
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

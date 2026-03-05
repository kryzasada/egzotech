"use client";

import { ComponentProps, useMemo, useState } from "react";
import { authFormSchema } from "@/lib/validations";
import { AUTH_FORM_ERROR_MESSAGE, type DataFieldConfig } from "@/types";
import {
  Alert,
  Box,
  For,
  Heading,
  Separator,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Button, Input } from "@/components/ui";
import { Card } from "@/components/ui";
import { useCurrentUser } from "@/hooks/db";
import { useUpdateUserCredentials } from "@/hooks/db/useUpdateUserCredentials";

type AuthFormValues = {
  email: string;
  newPassword: string;
  repeatNewPassword: string;
};

type FormSubmitHandler = NonNullable<ComponentProps<typeof Box>["onSubmit"]>;

export const AuthForm = () => {
  const { data: userData } = useCurrentUser();
  const { mutate: updateUserCredentials, isPending } =
    useUpdateUserCredentials();
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const defaultValues = useMemo(
    (): AuthFormValues => ({
      email: userData?.credentials?.email ?? "",
      newPassword: "",
      repeatNewPassword: "",
    }),
    [userData],
  );
  const [formValues, setFormValues] = useState(defaultValues);

  const handleSave: FormSubmitHandler = (event) => {
    event?.preventDefault();
    setError("");
    const validation = authFormSchema.safeParse({ ...formValues });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      console.log(validation.error.issues[0].message);
      return;
    }

    updateUserCredentials(validation.data, {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: () => {
        setError(AUTH_FORM_ERROR_MESSAGE.UpdateFailed);
      },
    });
  };

  const hasChanges = useMemo(
    () =>
      (Object.keys(formValues) as (keyof AuthFormValues)[]).some(
        (key) => formValues[key] !== defaultValues[key],
      ),
    [formValues, defaultValues],
  );

  const AUTH_DATA_FIELDS: DataFieldConfig<AuthFormValues>[] = [
    {
      label: "New Password",
      key: "newPassword",
      type: "password",
      placeholder: "Enter new password",
      isInvalid: error === AUTH_FORM_ERROR_MESSAGE.PasswordInvalid,
    },
    {
      label: "Repeat Password",
      key: "repeatNewPassword",
      type: "password",
      placeholder: "Repeat new password",
      isInvalid: error === AUTH_FORM_ERROR_MESSAGE.PasswordsDoNotMatch,
    },
  ];

  return (
    <Card
      bg="white"
      borderRadius="md"
      borderColor="white"
      px={4}
      py={4}
      w="full"
    >
      <Heading size="md" fontWeight="bold" color="text">
        Authentication Data
      </Heading>
      <Separator my={4} color="background" />

      <Box as="form" onSubmit={handleSave}>
        <VStack gap={5} align="stretch">
          <Box w="full">
            <Text fontSize="sm" fontWeight="medium" color="text" mb={2}>
              Email
            </Text>
            <Input
              type="email"
              placeholder="Enter email"
              value={String(formValues.email ?? "")}
              disabled={true}
            />
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
            <For each={AUTH_DATA_FIELDS}>
              {(field) => (
                <Box key={field.key}>
                  <Text fontSize="sm" fontWeight="medium" color="text" mb={2}>
                    {field.label}
                  </Text>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={String(formValues[field.key] ?? "")}
                    onChange={(e) =>
                      field.onChange
                        ? field.onChange(e.target.value)
                        : setFormValues({
                            ...formValues,
                            [field.key]: e.target.value,
                          })
                    }
                    aria-invalid={field.isInvalid}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </Box>
              )}
            </For>
          </SimpleGrid>

          {error && (
            <Alert.Root status="error" borderRadius="md">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>{error}</Alert.Title>
              </Alert.Content>
            </Alert.Root>
          )}

          {!error && isSuccess && (
            <Alert.Root status="success" borderRadius="md">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>
                  Authentication data updated successfully
                </Alert.Title>
              </Alert.Content>
            </Alert.Root>
          )}

          <Button
            type="submit"
            disabled={isPending || !hasChanges}
            btnType="fill"
            variant="primary"
            size="lg"
            alignSelf="flex-start"
            minW="100px"
          >
            {isPending ? <Spinner size="md" /> : "Save"}
          </Button>
        </VStack>
      </Box>
    </Card>
  );
};

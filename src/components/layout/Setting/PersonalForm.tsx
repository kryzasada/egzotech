"use client";

import { ComponentProps, useMemo, useState } from "react";
import { personalFormSchema } from "@/lib/validations";
import { type DataFieldConfig, PERSONAL_FORM_ERROR_MESSAGE } from "@/types";
import {
  Alert,
  Box,
  For,
  Heading,
  NativeSelect,
  Separator,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Button, Input } from "@/components/ui";
import { Card } from "@/components/ui";
import { useCurrentUser, useUpdateUserData } from "@/hooks/db";

type PersonalFormValues = {
  firstName: string;
  lastName: string;
  gender: string;
  // dateOfBirth: string;
  height: number;
  weight: number;
};

type FormSubmitHandler = NonNullable<ComponentProps<typeof Box>["onSubmit"]>;

export const PersonalForm = () => {
  const { data: userData } = useCurrentUser();
  const { mutate: updateUserData, isPending } = useUpdateUserData();
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const defaultValues = useMemo(
    (): PersonalFormValues => ({
      firstName: userData?.user?.firstName ?? "",
      lastName: userData?.user?.lastName ?? "",
      gender: userData?.user?.gender ?? "",
      // dateOfBirth: userData?.user?.dateOfBirth ?? "",
      height: userData?.user?.height ?? 0,
      weight: userData?.user?.weight ?? 0,
    }),
    [userData],
  );
  const [formValues, setFormValues] = useState(defaultValues);

  const handleSave: FormSubmitHandler = (event) => {
    event?.preventDefault();
    setError("");
    const validation = personalFormSchema.safeParse({ ...formValues });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      console.log(validation.error.issues[0].message);
      return;
    }

    updateUserData(validation.data, {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: () => {
        setError(PERSONAL_FORM_ERROR_MESSAGE.UpdateFailed);
      },
    });
  };

  const hasChanges = useMemo(
    () =>
      (Object.keys(formValues) as (keyof PersonalFormValues)[]).some(
        (key) => formValues[key] !== defaultValues[key],
      ),
    [formValues, defaultValues],
  );

  const PERSONAL_DATA_FIELDS: DataFieldConfig<PersonalFormValues>[] = [
    {
      label: "First name",
      key: "firstName",
      type: "text",
      placeholder: "Enter first name",
      isInvalid: formValues.firstName.trim() === "",
    },
    {
      label: "Last name",
      key: "lastName",
      type: "text",
      placeholder: "Enter last name",
    },
    {
      label: "Weight (kg)",
      key: "weight",
      type: "number",
      placeholder: "Enter weight",
      onChange: (value: string) =>
        setFormValues({
          ...formValues,
          weight: Number(value),
        }),
      isInvalid:
        isNaN(Number(formValues.weight)) ||
        Number(formValues.weight) <= 0 ||
        error === PERSONAL_FORM_ERROR_MESSAGE.WeightInvalid,
    },
    {
      label: "Height (cm)",
      key: "height",
      type: "number",
      placeholder: "Enter height",
      onChange: (value: string) =>
        setFormValues({
          ...formValues,
          height: Number(value),
        }),
      isInvalid:
        isNaN(Number(formValues.height)) ||
        Number(formValues.height) <= 0 ||
        error === PERSONAL_FORM_ERROR_MESSAGE.HeightInvalid,
    },
  ];

  return (
    <Card type="primary" px={4} py={4} w="full">
      <Heading size="md" fontWeight="bold" color="text">
        Personal Data
      </Heading>
      <Separator my={4} color="background" />

      <Box as="form" onSubmit={handleSave}>
        <VStack gap={5} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
            <For each={PERSONAL_DATA_FIELDS}>
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
                        ? field.onChange(e.target.value.trim())
                        : setFormValues({
                            ...formValues,
                            [field.key]: e.target.value.trim(),
                          })
                    }
                    aria-invalid={field.isInvalid}
                  />
                </Box>
              )}
            </For>
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="text" mb={2}>
                Gender
              </Text>
              <NativeSelect.Root
                size="lg"
                invalid={formValues.gender.trim() === ""}
                bg="white"
                border="1px solid"
                borderColor={
                  formValues.gender.trim() === "" ? "red.500" : "secondary"
                }
                color="text"
                borderRadius="md"
                _focus={{
                  borderColor:
                    formValues.gender.trim() === "" ? "red.500" : "secondary",
                  outline: "none",
                  boxShadow: "none",
                }}
              >
                <NativeSelect.Field
                  value={String(formValues.gender ?? "")}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      gender: e.target.value,
                    })
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Box>
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
                <Alert.Title>Data updated successfully</Alert.Title>
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

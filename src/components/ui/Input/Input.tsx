"use client";

import { ChangeEvent, forwardRef, useEffect, useMemo, useState } from "react";
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { useDebounce } from "use-debounce";
import { PasswordInput } from "./PasswordInput";

export type InputType = "text" | "email" | "number" | "password";

export interface InputProps extends Omit<ChakraInputProps, "type"> {
  type?: InputType;
  onValidationChange?: (isValid: boolean) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", onValidationChange, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(
      props.value || props.defaultValue || "",
    );
    const [debouncedValue] = useDebounce(inputValue, 500);

    const isEmailInvalid = useMemo<boolean>(() => {
      if (type !== "email") return false;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const value = String(debouncedValue);
      const isValid = value === "" || emailRegex.test(value);

      return !isValid;
    }, [debouncedValue, type]);

    useEffect(() => {
      onValidationChange?.(!isEmailInvalid);
    }, [isEmailInvalid, onValidationChange]);

    if (type === "password") {
      return <PasswordInput ref={ref} {...props} />;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      props.onChange?.(e);
    };

    const isInvalid = props["aria-invalid"] || isEmailInvalid;

    return (
      <ChakraInput
        ref={ref}
        type={type}
        size="lg"
        bg="white"
        border="1px solid"
        color="text"
        borderColor={isInvalid ? "danger" : "secondary"}
        _focus={{
          borderColor: isInvalid ? "danger" : "secondary",
          outline: "none",
          boxShadow: "none",
        }}
        _invalid={{
          borderColor: "danger",
        }}
        borderRadius="md"
        {...props}
        onChange={handleChange}
        aria-invalid={isInvalid}
      />
    );
  },
);

Input.displayName = "Input";

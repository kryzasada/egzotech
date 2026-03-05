"use client";

import { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  IconButton,
  InputGroup,
} from "@chakra-ui/react";

export type PasswordInputProps = Omit<ChakraInputProps, "type">;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => setShowPassword(!showPassword);

    return (
      <InputGroup
        w="full"
        endElement={
          <IconButton
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            variant="ghost"
            onClick={handleTogglePassword}
            size="sm"
            color="gray.500"
            _hover={{ bg: "transparent" }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </IconButton>
        }
      >
        <ChakraInput
          ref={ref}
          type={showPassword ? "text" : "password"}
          size="lg"
          bg="white"
          border="1px solid"
          color="text"
          borderColor={props["aria-invalid"] ? "red.500" : "secondary"}
          _focus={{
            borderColor: props["aria-invalid"] ? "red.500" : "secondary",
            outline: "none",
            boxShadow: "none",
          }}
          borderRadius="md"
          {...props}
        />
      </InputGroup>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

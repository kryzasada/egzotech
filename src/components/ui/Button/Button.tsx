"use client";

import { ElementType } from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Icon,
} from "@chakra-ui/react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";
type ButtonType = "fill" | "outline";

interface ButtonProps extends Omit<ChakraButtonProps, "variant" | "rightIcon"> {
  variant?: ButtonVariant;
  btnType?: ButtonType;
  rightIcon?: ElementType;
  size?: "xs" | "sm" | "md" | "lg";
}

const variantColors: Record<ButtonVariant, string> = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
};

export const Button = ({
  children,
  variant = "primary",
  btnType = "fill",
  rightIcon: RightIcon,
  ...props
}: ButtonProps) => {
  const colorValue = variantColors[variant];

  const styles =
    btnType === "outline"
      ? {
          bg: "white",
          color: colorValue,
          border: "1px solid",
          borderColor: colorValue,
          _hover: {
            opacity: 0.6,
          },
        }
      : {
          bg: colorValue,
          color: "white",
          border: "none",
          _hover: {
            opacity: 0.6,
          },
        };

  return (
    <ChakraButton
      {...styles}
      px={4}
      py={2}
      size="sm"
      _focusVisible={{ borderWidth: 0, outline: "none" }}
      {...props}
    >
      {children}
      {RightIcon && <Icon as={RightIcon} boxSize="12px" />}
    </ChakraButton>
  );
};

import {
  FaArrowRight,
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
  FaSignOutAlt,
  FaTrash,
} from "react-icons/fa";
import { HStack, Text, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button, ButtonVariant } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info"],
    },
    btnType: {
      control: "radio",
      options: ["primary", "secondary"],
    },
    children: {
      control: "text",
    },
    rightIcon: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default = () => (
  <VStack align="start" gap={8}>
    <VStack align="start" gap={4}>
      <Text fontWeight="bold">Fill</Text>
      <HStack gap={4}>
        {["primary", "secondary", "success", "danger", "warning", "info"].map(
          (variant) => (
            <Button
              key={variant}
              btnType="fill"
              variant={variant as ButtonVariant}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ),
        )}
      </HStack>
    </VStack>

    <VStack align="start" gap={4}>
      <Text fontWeight="bold">Outline</Text>
      <HStack gap={4}>
        {["primary", "secondary", "success", "danger", "warning", "info"].map(
          (variant) => (
            <Button
              key={variant}
              btnType="outline"
              variant={variant as ButtonVariant}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ),
        )}
      </HStack>
    </VStack>

    <VStack align="start" gap={4}>
      <Text fontWeight="bold">Fill with Icon</Text>
      <HStack gap={4}>
        {[
          { variant: "primary", label: "Primary", icon: FaSignOutAlt },
          {
            variant: "secondary",
            label: "Secondary",
            icon: FaSignOutAlt,
          },
          { variant: "success", label: "Success", icon: FaCheck },
          { variant: "danger", label: "Danger", icon: FaTrash },
          {
            variant: "warning",
            label: "Warning",
            icon: FaExclamationTriangle,
          },
          { variant: "info", label: "Info", icon: FaInfoCircle },
        ].map(({ variant, label, icon }) => (
          <Button
            key={variant}
            btnType="fill"
            variant={variant as ButtonVariant}
            rightIcon={icon}
          >
            {label}
          </Button>
        ))}
      </HStack>
    </VStack>
  </VStack>
);

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    btnType: "fill",
  },
};

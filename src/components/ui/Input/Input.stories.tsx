import { Text, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "number", "password"],
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    "aria-invalid": {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const AllVariants = () => (
  <VStack align="stretch" gap={8} maxW="400px">
    <VStack align="stretch" gap={2}>
      <Text fontWeight="bold">Text Input</Text>
      <Input type="text" placeholder="Enter text..." />
    </VStack>

    <VStack align="stretch" gap={2}>
      <Text fontWeight="bold">Email Input</Text>
      <Input type="email" placeholder="Enter email..." />
    </VStack>

    <VStack align="stretch" gap={2}>
      <Text fontWeight="bold">Number Input</Text>
      <Input type="number" placeholder="Enter number..." />
    </VStack>

    <VStack align="stretch" gap={2}>
      <Text fontWeight="bold">Password Input</Text>
      <Input type="password" placeholder="Enter password..." />
    </VStack>

    <VStack align="stretch" gap={2}>
      <Text fontWeight="bold">Invalid State</Text>
      <Input type="text" placeholder="Invalid input..." aria-invalid={true} />
    </VStack>

    <VStack align="stretch" gap={2}>
      <Text fontWeight="bold">Disabled State</Text>
      <Input type="text" placeholder="Disabled input..." disabled />
    </VStack>
  </VStack>
);

export const TextField: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
};

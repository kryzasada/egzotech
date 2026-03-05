import { Box, Button, Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Card } from "./Card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["primary", "secondary"],
    },
    children: {
      control: false,
    },
    maxW: {
      control: false,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxW: "320px",
    type: "primary",
    children: (
      <Box display="flex" flexDirection="column" gap={5} p={0}>
        <Text fontSize="xs" color="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
          odio vel dui euismod fermentum. Curabitur nec odio vel dui euismod
          fermentum.
        </Text>
        <Button variant="outline" size="sm" maxW={"100px"}>
          View
        </Button>
      </Box>
    ),
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs";
import { Avatar } from "./Avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    gender: {
      control: "radio",
      options: ["male", "female"],
    },
    size: {
      control: "radio",
      options: ["sm", "lg"],
    },
    background: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Female: Story = {
  args: {
    gender: "female",
    size: "lg",
    background: true,
  },
};

export const Male: Story = {
  args: {
    gender: "male",
    size: "lg",
    background: true,
  },
};

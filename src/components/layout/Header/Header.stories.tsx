import type { Meta, StoryObj } from "@storybook/nextjs";
import { Header } from "./Header";

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "gray",
      values: [
        {
          name: "gray",
          value: "#eff7f8",
        },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

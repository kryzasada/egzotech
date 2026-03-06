import type { Meta, StoryObj } from "@storybook/nextjs";
import { NavDrawer } from "./NavDrawer";

const meta = {
  title: "Layout/NavDrawer",
  component: NavDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NavDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

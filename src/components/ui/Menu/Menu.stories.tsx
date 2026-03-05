import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Menu } from "./Menu";

const meta = {
  title: "UI/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "2rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button variant="outline">Open Menu</Button>,
    title: "User Menu",
    items: [
      {
        id: 1,
        name: "Profile",
        description: "View your profile",
        icon: FaUser,
      },
      {
        id: 2,
        name: "Settings",
        description: "Manage your account",
        icon: FaCog,
      },
      {
        id: 3,
        name: "Logout",
        icon: FaSignOutAlt,
      },
    ],
    counter: true,
  },
};

import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Avatar, Button, Menu } from "@/components/ui";

const USER_MENU_ITEMS = [
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
];

const UserMenu = () => {
  const { logout } = useAuth();
  const name = "Bini Jet";
  const displayName = name.length <= 10 ? name : name.split(" ")[0];

  const UserAvatar = (
    <HStack gap={3} _hover={{ opacity: 0.8 }}>
      <Avatar gender="female" size="sm" />
      <Box lineHeight="1.2">
        <Text fontWeight="bold" fontSize="sm" color="text">
          {displayName}
        </Text>
        <Text color="primary" fontSize="xs" fontWeight="medium">
          Patient
        </Text>
      </Box>
    </HStack>
  );

  const UserMenuFooter = (
    <Box textAlign="center">
      <Button
        btnType="fill"
        variant="primary"
        rightIcon={FaSignOutAlt}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <Menu
      title="User Menu"
      trigger={UserAvatar}
      items={USER_MENU_ITEMS}
      footer={UserMenuFooter}
    />
  );
};

export default UserMenu;

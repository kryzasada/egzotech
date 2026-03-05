import { FaSignOutAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { signOut } from "next-auth/react";
import { Box, HStack, Skeleton, Text } from "@chakra-ui/react";
import { Avatar, Button, Menu } from "@/components/ui";
import { useCurrentUser } from "@/hooks/db";

const USER_MENU_ITEMS = [
  {
    id: 1,
    name: "Home",
    description: "Home dashboard",
    icon: FaHome,
    href: "/dashboard",
  },
  {
    id: 2,
    name: "My Settings",
    description: "Manage your account",
    icon: IoMdSettings,
    href: "/settings",
  },
];

export const UserMenu = () => {
  const { data: userData, isLoading } = useCurrentUser();

  const user = userData?.user;
  const userType = userData?.userType;

  const name =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || "";

  const displayName = name.length <= 20 ? name : name.split(" ")[0];

  const UserAvatar = (
    <HStack gap={3} _hover={{ opacity: 0.8 }}>
      <Avatar gender="female" size="sm" />
      <Box lineHeight="1.2">
        {isLoading ? (
          <Skeleton height="20px" width="100px" mb={1} />
        ) : (
          <Text fontWeight="bold" fontSize="sm" color="text">
            {displayName}
          </Text>
        )}
        {isLoading ? (
          <Skeleton height="16px" width="60px" />
        ) : (
          <Text color="primary" fontSize="xs" fontWeight="medium">
            {userType?.name || "Patient"}
          </Text>
        )}
      </Box>
    </HStack>
  );

  const UserMenuFooter = (
    <Box textAlign="center">
      <Button
        btnType="fill"
        variant="primary"
        rightIcon={FaSignOutAlt}
        onClick={() => signOut({ callbackUrl: "/login" })}
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

import { useMemo } from "react";
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
  const { data: userProfile } = useCurrentUser();

  const userType = userData?.userType;

  const displayName = useMemo(() => {
    const name = `${userProfile?.user?.firstName} ${userProfile?.user?.lastName}`;
    return name.length <= 20 ? name : name.split(" ")[0];
  }, [userProfile]);

  const UserAvatar = (
    <HStack gap={3} _hover={{ opacity: 0.8 }}>
      <Avatar gender={userProfile?.user?.gender ?? "male"} size="sm" />
      <Box lineHeight="1.2">
        {isLoading ? (
          <Skeleton height={5} width="100px" mb={1} />
        ) : (
          <Text fontWeight="bold" fontSize="sm" color="text">
            {displayName}
          </Text>
        )}
        {isLoading ? (
          <Skeleton height={4} width="60px" />
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

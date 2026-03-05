import { IconType } from "react-icons";
import { Button, Icon, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui";

interface NavItemProps {
  icon: IconType;
  label: string;
  isCollapsed: boolean;
}

export const NavItem = ({ icon, label, isCollapsed }: NavItemProps) => {
  return (
    <Tooltip
      content={label}
      disabled={!isCollapsed}
      positioning={{ placement: "right" }}
    >
      <Button
        variant="ghost"
        color="white"
        _hover={{ bg: "whiteAlpha.200" }}
        justifyContent="flex-start"
        w="full"
        h="48px"
        px={3}
      >
        <Icon as={icon} fontSize="xl" minW="24px" />
        <Text
          ml={4}
          fontWeight="medium"
          fontSize="sm"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {label}
        </Text>
      </Button>
    </Tooltip>
  );
};

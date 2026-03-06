import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import { Button, Icon, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui";

interface NavItemProps {
  icon: IconType;
  label: string;
  isCollapsed: boolean;
  href?: string;
}

export const NavItem = ({ icon, label, isCollapsed, href }: NavItemProps) => {
  const router = useRouter();

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
        h={12}
        px={3}
        onClick={() => href && router.push(href)}
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

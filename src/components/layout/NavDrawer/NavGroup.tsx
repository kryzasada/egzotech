import { IconType } from "react-icons";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NavItem } from "./NavItem";

const MotionText = motion(Text);

interface NavGroupProps {
  title: string;
  items: {
    icon: IconType;
    label: string;
    href: string;
  }[];
  isCollapsed: boolean;
}

export const NavGroup = ({ title, items, isCollapsed }: NavGroupProps) => {
  return (
    <Box mb={isCollapsed ? 0 : 4}>
      <MotionText
        initial={{ opacity: 1, height: "auto" }}
        animate={{
          opacity: isCollapsed ? 0 : 0.7,
          height: isCollapsed ? 0 : "auto",
          marginBottom: isCollapsed ? 0 : 8,
        }}
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
        pl={4}
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {title}
      </MotionText>
      {items.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          label={item.label}
          isCollapsed={isCollapsed}
          href={item.href}
        />
      ))}
    </Box>
  );
};

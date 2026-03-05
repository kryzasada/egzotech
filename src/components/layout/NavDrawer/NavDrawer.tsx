"use client";

import { useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { FaFileAlt, FaUserMd } from "react-icons/fa";
import { Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NavGroup } from "./NavGroup";
import { NavHeader } from "./NavHeader";

const MotionBox = motion(Box);

const MENU_GROUPS = [
  {
    title: "Dashboard",
    items: [
      { icon: FaUserMd, label: "Doctor Dashboard", href: "#" },
      { icon: BsChatDots, label: "Chat", href: "#" },
    ],
  },
  {
    title: "Pages",
    items: [{ icon: FaFileAlt, label: "Extra Pages", href: "#" }],
  },
];

const NavDrawer = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <MotionBox
      as="nav"
      h="100vh"
      bg="primary"
      color="white"
      position="sticky"
      top={0}
      left={0}
      overflow="hidden"
      initial={{ width: "280px" }}
      animate={{ width: isCollapsed ? "64px" : "280px" }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      display="flex"
      flexDirection="column"
      zIndex={100}
    >
      <NavHeader
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      <VStack align="stretch" gap={1} px={2} flex={1} overflowY="auto">
        {MENU_GROUPS.map((group, groupIndex) => (
          <NavGroup
            key={groupIndex}
            title={group.title}
            items={group.items}
            isCollapsed={isCollapsed}
          />
        ))}
      </VStack>
    </MotionBox>
  );
};

export default NavDrawer;

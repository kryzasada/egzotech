import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface NavHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const NavHeader = ({ isCollapsed, onToggle }: NavHeaderProps) => {
  return (
    <Flex
      align="center"
      justify={isCollapsed ? "flex-start" : "space-between"}
      p={3}
      mb={6}
      mt={3}
      h={20}
      w="full"
      minW={12}
    >
      <motion.div
        initial={{ opacity: 1, width: "auto" }}
        animate={{
          opacity: isCollapsed ? 0 : 1,
          width: isCollapsed ? 0 : "auto",
        }}
        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
      >
        <Box
          position="relative"
          w={40}
          h="45px"
          minW={12}
          // @ts-expect-error - Chakrra UI types are not compatible with Next.js 15
          display={{ base: "none", tablet: "block" }}
        >
          <Box as="span">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              style={{
                zIndex: 100,
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Box>
        </Box>
      </motion.div>

      <IconButton
        aria-label="Toggle Menu"
        variant="ghost"
        color="white"
        _hover={{ bg: "whiteAlpha.200" }}
        onClick={onToggle}
        size="md"
        ml={isCollapsed ? 0 : 4}
        rotate={isCollapsed ? "0deg" : "90deg"}
        transition="all 0.3s ease-in-out"
        // @ts-expect-error - Chakrra UI types are not compatible with Next.js 15
        display={{ base: "none", tablet: "block" }}
      >
        <Icon as={BsThreeDots} fontSize="md" />
      </IconButton>
    </Flex>
  );
};

"use client";

import { useEffect, useState } from "react";
import { Flex, HStack } from "@chakra-ui/react";
import { Actions } from "./Actions";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Flex
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      w="full"
      px={8}
      py={4}
      align="center"
      justify="flex-end"
      boxSizing="border-box"
      mx="auto"
      maxW={isScrolled ? "100%" : "97%"}
      mt={isScrolled ? 0 : 5}
      transition="all 0.3s ease-in-out"
      borderRadius={isScrolled ? 0 : 2.5}
      bg="white"
    >
      <HStack gap={8}>
        <Actions />
        <UserMenu />
      </HStack>
    </Flex>
  );
};

export default Header;

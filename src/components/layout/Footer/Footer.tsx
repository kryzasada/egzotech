import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      w="full"
      px={6}
      py={3}
      justify="space-between"
      align="center"
      mx="auto"
      maxW={"97%"}
      borderRadius={"xl"}
      bg="white"
      mb={5}
      mt={5}
    >
      <Image
        src="/logo.png"
        alt="Egzotech Logo"
        width={120}
        height={40}
        style={{ objectFit: "contain" }}
      />
      <Text fontSize="sm" color="text" display={{ base: "none", sm: "block" }}>
        © {currentYear} Egzotech. All rights reserved.
      </Text>
    </Flex>
  );
};

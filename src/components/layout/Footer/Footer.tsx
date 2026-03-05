import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
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
      borderRadius={2.5}
      bg="white"
      mb={5}
    >
      <Image
        src="/logo.png"
        alt="Egzotech Logo"
        width={120}
        height={40}
        style={{ objectFit: "contain" }}
      />
      <Text fontSize="sm" color="text">
        © {currentYear} Egzotech. All rights reserved.
      </Text>
    </Flex>
  );
};

export default Footer;

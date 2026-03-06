import { ReactNode } from "react";
import Image from "next/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Flex
      minH="100vh"
      w="full"
      bg="primary"
      align="center"
      justify="center"
      p={4}
    >
      <Flex
        w="full"
        maxW="1200px"
        align="center"
        justify="space-between"
        gap={12}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Flex
          flex={1}
          direction="column"
          color="white"
          p={8}
          align={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <Box mb={8}>
            <Image
              src="/logo-white.png"
              alt="Egzotech Logo"
              width={170}
              height={170}
            />
          </Box>

          <Heading size="2xl" mb={6} fontWeight="bold">
            Your Road to Health
          </Heading>
          <Text fontSize="lg" opacity={0.9} maxW="md" lineHeight="tall">
            Access your personalized exercise plans, track your progress, and
            achieve your recovery goals with ease.
          </Text>
        </Flex>

        <Box
          flex={1}
          maxW="500px"
          w="full"
          bg="white"
          p={{ base: 8, md: 12 }}
          borderRadius="3xl"
          boxShadow="2xl"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

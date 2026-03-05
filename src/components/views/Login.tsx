"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui";

export const Login = () => {
  return (
    <Flex
      minH="100vh"
      w="full"
      bg="#009CA6"
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
            Your Rehabilitation Journey
          </Heading>
          <Text fontSize="lg" opacity={0.9} maxW="md" lineHeight="tall">
            Access your personalized exercise plans, track your progress, and
            achieve your recovery goals with ease.
          </Text>
        </Flex>

        <Card
          flex={1}
          maxW="500px"
          w="full"
          bg="white"
          p={{ base: 5, md: 10 }}
          borderRadius="3xl"
          boxShadow="2xl"
        >
          <RegisterForm />
        </Card>
      </Flex>
    </Flex>
  );
};

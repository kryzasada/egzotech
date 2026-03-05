"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

export const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <Box minH="100vh" bg="gray.50" p={8}>
      <Container maxW="container.lg">
        <VStack gap={8} align="stretch">
          <Box
            p={6}
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading size="md">Dashboard</Heading>
            <Button variant="outline" colorScheme="red" onClick={logout}>
              Log Out
            </Button>
          </Box>

          <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
            <Heading size="lg" mb={4}>
              Welcome back!
            </Heading>
            <Text color="gray.600">
              You have successfully logged in. This is your dashboard view.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

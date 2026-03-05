"use client";

import { Box, Flex } from "@chakra-ui/react";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import NavDrawer from "@/components/layout/NavDrawer/NavDrawer";

export const Dashboard = () => {
  return (
    <Flex minH="100vh" bg="primary">
      <NavDrawer />
      <Flex
        direction="column"
        flex={1}
        position="relative"
        bg="background"
        borderStartRadius={"2xl"}
      >
        <Header />
        <Box flex={1} p={6}>
          {/* Main content area */}
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
};

import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Footer, Header, NavDrawer } from "@/components/layout";
import { AuthSpinner } from "@/components/layout";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthSpinner>
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
          <Box flex={1} p={4}>
            {children}
          </Box>
          <Footer />
        </Flex>
      </Flex>
    </AuthSpinner>
  );
};

export default HomeLayout;

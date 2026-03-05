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
          <Box flex={1} maxW={"97%"} w="full" mx="auto" mt={5}>
            {children}
          </Box>
          <Footer />
        </Flex>
      </Flex>
    </AuthSpinner>
  );
};

export default HomeLayout;

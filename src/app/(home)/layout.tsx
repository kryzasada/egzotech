import { Box, Flex } from "@chakra-ui/react";
import { AuthSpinner } from "@/components/auth";
import { Footer, Header, NavDrawer } from "@/components/layout";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
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
          <Box flex={1} p={6}>
            {children}
          </Box>
          <Footer />
        </Flex>
      </Flex>
    </AuthSpinner>
  );
};

export default HomeLayout;

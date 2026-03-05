import { Flex } from "@chakra-ui/react";
import { AuthForm, PersonalForm } from "@/components/layout/";

export const SettingsPage = () => {
  return (
    <Flex
      gap={4}
      flexDirection={{ base: "column", md: "row" }}
      align="stretch"
      w="full"
    >
      <PersonalForm />
      <AuthForm />
    </Flex>
  );
};

export default SettingsPage;

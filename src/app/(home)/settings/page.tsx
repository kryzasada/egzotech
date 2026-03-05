import { Flex } from "@chakra-ui/react";
import { AuthForm, PersonalForm } from "@/components/layout/";

export const SettingsPage = () => {
  return (
    <Flex gap={4}>
      <PersonalForm />
      <AuthForm />
    </Flex>
  );
};

export default SettingsPage;

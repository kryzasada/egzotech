"use client";

import { Flex, Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Card } from "@/components/ui";

export const SettingsPage = () => {
  return (
    <Flex direction="column" gap={4}>
      <Heading size="lg">Settings</Heading>
      <Card>
        <Text>Account</Text>
      </Card>
    </Flex>
  );
};

export default SettingsPage;

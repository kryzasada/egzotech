"use client";

import { Box, Flex, For, Heading, Separator } from "@chakra-ui/react";
import { Card } from "@/components/ui";
import { useCurrentUser } from "@/hooks/db";
import { formatDate } from "@/helpers/date";
import { CardItem, CardItemData } from "./CardItem";

export const PersonalInformationCard = () => {
  const { data: userData } = useCurrentUser();

  const PERSONAL_INFORMATION_CARD_DATA: CardItemData[] = [
    {
      title: "First Name:",
      value: userData?.user?.firstName ?? "--",
    },
    {
      title: "Last Name:",
      value: userData?.user?.lastName ?? "--",
    },
    {
      title: "Birthday:",
      value: formatDate(userData?.user?.dateOfBirth),
    },
    {
      title: "Gender:",
      value: userData?.user?.gender
        ? userData?.user?.gender.charAt(0).toUpperCase() +
          userData?.user?.gender.slice(1)
        : "--",
    },
    {
      title: "Email:",
      value: userData?.credentials?.email ? userData?.credentials?.email : "--",
    },
  ];

  return (
    <Card type="primary" px={4} py={4}>
      <Flex direction="column" gap={4}>
        <Box>
          <Heading size="md" color="text">
            Personal Information
          </Heading>
          <Separator my={4} color="background" />
          <Flex direction="column" gap={4}>
            <For each={PERSONAL_INFORMATION_CARD_DATA}>
              {(item) => (
                <CardItem
                  key={item.title}
                  title={item.title}
                  value={item.value.toString()}
                  vertical={true}
                  type="secondary"
                />
              )}
            </For>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

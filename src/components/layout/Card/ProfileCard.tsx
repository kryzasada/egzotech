"use client";

import { calculateAge } from "@/helpers/date";
import { Flex, For, Text } from "@chakra-ui/react";
import { Avatar, Card } from "@/components/ui";
import { useCurrentUser } from "@/hooks/db";
import { CardItem, CardItemData } from "./CardItem";

export const ProfileCard = () => {
  const { data: userData } = useCurrentUser();

  const PROFILE_CARD_DATA: CardItemData[] = [
    {
      title: "Age",
      value: userData?.user?.dateOfBirth
        ? calculateAge(userData?.user?.dateOfBirth)
        : "--",
    },
    {
      title: "Weight",
      value: userData?.user?.weight ? userData?.user?.weight : "--",
    },
    {
      title: "Height",
      value: userData?.user?.height ? userData?.user?.height : "--",
    },
  ];
  return (
    <Card type="primary" px={4} py={4}>
      <Flex direction="column" gap={4} align="center">
        <Avatar gender="male" size="lg" background />
        <Text fontSize="sm" fontWeight="bold" color="text">
          {userData?.user?.firstName ?? "--"} {userData?.user?.lastName ?? "--"}
        </Text>
        <Flex gap={6}>
          <For each={PROFILE_CARD_DATA}>
            {(item) => (
              <CardItem
                key={item.title}
                title={item.title}
                value={item.value.toString()}
              />
            )}
          </For>
        </Flex>
      </Flex>
    </Card>
  );
};

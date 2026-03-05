import { Flex, Text } from "@chakra-ui/react";

export type CardItemData = {
  title: string;
  value: string | number;
};

type CardItemProps = {
  title: string;
  value: string;
  vertical?: boolean;
  type?: "primary" | "secondary";
};

export const CardItem = (props: CardItemProps) => {
  const { title, value, vertical = false, type = "primary" } = props;

  return (
    <Flex direction={vertical ? "row" : "column"} gap={2} align="center">
      <Text
        w={type === "primary" ? "" : "50%"}
        px={type === "primary" ? 0 : 2}
        fontSize={type === "primary" ? "sm" : "xs"}
        fontWeight={type === "primary" ? "bold" : "medium"}
        color={type === "primary" ? "primary" : "text"}
      >
        {title}
      </Text>
      <Text
        fontSize={type === "primary" ? "sm" : "xs"}
        fontWeight={type === "primary" ? "bold" : "medium"}
        color={type === "primary" ? "text" : "textSecondary"}
      >
        {value}
      </Text>
    </Flex>
  );
};

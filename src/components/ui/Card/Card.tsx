import { Card as ChakraCard } from "@chakra-ui/react";

interface CardProps extends ChakraCard.RootProps {
  children: React.ReactNode;
  type?: "primary" | "secondary";
}

export const Card = (props: CardProps) => {
  const { children, type = "primary", ...rest } = props;
  return (
    <ChakraCard.Root
      h={"full"}
      px={"21px"}
      py={type === "primary" ? "21px" : 3.5}
      mt={"7px"}
      bg={type === "primary" ? "background" : "primary"}
      borderRadius={type === "primary" ? "sm" : "md"}
      {...rest}
    >
      <ChakraCard.Body gap={2} p={0} h={"full"}>
        <ChakraCard.Description as="div">{children}</ChakraCard.Description>
      </ChakraCard.Body>
    </ChakraCard.Root>
  );
};

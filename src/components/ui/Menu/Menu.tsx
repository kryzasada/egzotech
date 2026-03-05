import { ReactNode } from "react";
import { IconType } from "react-icons";
import {
  Badge,
  Box,
  Menu as ChakraMenu,
  Flex,
  HStack,
  Icon,
  Separator,
  Text,
} from "@chakra-ui/react";

export interface MenuItemData {
  id: string | number;
  name: string;
  description?: string;
  icon?: ReactNode | IconType;
  timestamp?: string;
}

interface MenuProps {
  trigger: ReactNode;
  title: string;
  items: MenuItemData[];
  footer?: ReactNode;
  counter?: boolean;
  emptyDescription?: string;
}

export const Menu = ({
  trigger,
  title,
  items,
  footer,
  emptyDescription = "",
  counter = false,
}: MenuProps) => {
  return (
    <ChakraMenu.Root>
      <ChakraMenu.Trigger asChild>
        <Box display="inline-flex" cursor="pointer">
          {trigger}
        </Box>
      </ChakraMenu.Trigger>
      <ChakraMenu.Positioner>
        <ChakraMenu.Content
          p={0}
          minW={80}
          overflow="hidden"
          borderRadius="md"
          boxShadow="lg"
          bg="white"
        >
          <Flex
            bg="primary"
            px={"21px"}
            py={3.5}
            justify="space-between"
            align="center"
          >
            <Text color="white" fontWeight="bold" fontSize="md">
              {title}
            </Text>
            {counter && (
              <Badge bg="secondary" color="white" borderRadius="sm" px={2}>
                {items.length}
              </Badge>
            )}
          </Flex>

          <Box>
            {items.map((item, index) => (
              <Box key={item.id}>
                <ChakraMenu.Item
                  value={item.name}
                  py={2.5}
                  px={"17px"}
                  cursor="pointer"
                  _hover={{ opacity: 0.6 }}
                  bg="white"
                >
                  <HStack gap={3} w="full" align="start" alignItems="center">
                    {item.icon && (
                      <Box
                        p={"5px"}
                        width={6}
                        height={6}
                        bg="secondary"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {typeof item.icon === "function" ? (
                          <Icon as={item.icon} color="white" />
                        ) : (
                          item.icon
                        )}
                      </Box>
                    )}
                    <Box>
                      <Flex justify="space-between" align="center">
                        <Text fontWeight="bold" fontSize="sm" color="text">
                          {item.name}
                        </Text>
                        {item.timestamp && (
                          <Text fontSize="xs" color="textSecondary">
                            {item.timestamp}
                          </Text>
                        )}
                      </Flex>
                      {item.description && (
                        <Text fontSize="xs" color="textSecondary" lineClamp={1}>
                          {item.description}
                        </Text>
                      )}
                    </Box>
                  </HStack>
                </ChakraMenu.Item>
                {index < items.length - 1 && <Separator />}
              </Box>
            ))}
          </Box>

          {items.length === 0 && emptyDescription && (
            <Box
              px={"21px"}
              py={"21px"}
              borderTopWidth="1px"
              borderColor="border"
            >
              <Text fontSize="xs" color="textSecondary" textAlign="center">
                {emptyDescription}
              </Text>
            </Box>
          )}

          {footer && (
            <Box
              px={"21px"}
              py={"7px"}
              borderTopWidth="1px"
              borderColor="border"
            >
              {footer}
            </Box>
          )}
        </ChakraMenu.Content>
      </ChakraMenu.Positioner>
    </ChakraMenu.Root>
  );
};

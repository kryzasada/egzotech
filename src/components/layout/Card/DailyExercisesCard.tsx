import { Flex, Heading, Table, Text } from "@chakra-ui/react";
import { Button, Card } from "@/components/ui";

const items = [
  {
    id: 1,
    name: "Rotor kończyn górnych",
    time: "10:00",
    load: "100kg",
    status: "Completed",
    action: "Start",
  },
  {
    id: 3,
    name: "Desk Chair",
    time: "10:00",
    load: "100kg",
    status: "Completed",
    action: "Start",
  },
  {
    id: 4,
    name: "Smartphone",
    time: "10:00",
    load: "100kg",
    status: "Completed",
    action: "Continue",
  },
  {
    id: 5,
    name: "Headphones",
    time: "10:00",
    load: "100kg",
    status: "Completed",
    action: "Continue",
  },
];

export const DailyExercisesCard = () => {
  return (
    <Card type="primary" px={4} py={4} h="min-content">
      <Flex direction="column" gap={4}>
        <Heading fontSize="sm" fontWeight="bold" color="text">
          Your Daily Exercises
        </Heading>
        <Flex direction="column" gap={4}>
          <Table.Root size="sm">
            <Table.Header px={4}>
              <Table.Row bg="background">
                <Table.ColumnHeader align="center" color={"primary"}>
                  <Text my={2} px={6}>
                    Name
                  </Text>
                </Table.ColumnHeader>
                <Table.ColumnHeader align="center" color={"primary"}>
                  <Text my={2} px={6}>
                    Time
                  </Text>
                </Table.ColumnHeader>
                <Table.ColumnHeader align="center" color={"primary"}>
                  <Text my={2} px={6}>
                    Load
                  </Text>
                </Table.ColumnHeader>
                <Table.ColumnHeader align="center" color={"primary"}>
                  <Text my={2} px={6}>
                    Status
                  </Text>
                </Table.ColumnHeader>
                <Table.ColumnHeader align="center" color={"primary"}>
                  <Text my={2} px={6}></Text>
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {items.map((item) => (
                <Table.Row key={item.id} my={2} gap={4}>
                  <Table.Cell align="left" my={2} px={4} h={"40px"} gap={4}>
                    <Text
                      my={2}
                      px={4}
                      fontSize="sm"
                      fontWeight="medium"
                      color="text"
                    >
                      {item.name}
                    </Text>
                  </Table.Cell>
                  <Table.Cell align="center" my={2} px={4}>
                    <Text my={2} px={4} fontSize="xs" color="text">
                      {item.load}
                    </Text>
                  </Table.Cell>
                  <Table.Cell align="center" my={2} px={4}>
                    <Text my={2} px={4} fontSize="xs" color="text">
                      {item.time}
                    </Text>
                  </Table.Cell>
                  <Table.Cell align="center" my={2} px={4}>
                    <Text my={2} px={4} fontSize="xs" color="text">
                      {item.status}
                    </Text>
                  </Table.Cell>
                  <Table.Cell align="center" my={2} px={4}>
                    <Button
                      variant={item.action === "Start" ? "success" : "warning"}
                      size="xs"
                      minW="88px"
                    >
                      {item.action}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Flex>
      </Flex>
    </Card>
  );
};

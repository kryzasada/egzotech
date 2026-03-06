import { Table, Text } from "@chakra-ui/react";

export const ExercisesHeader = ({ title }: { title: string }) => {
  return (
    <Table.ColumnHeader align="center" color={"primary"}>
      <Text my={2} px={6} textAlign="center">
        {title}
      </Text>
    </Table.ColumnHeader>
  );
};

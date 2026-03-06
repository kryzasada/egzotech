import { Table, Text } from "@chakra-ui/react";

interface ExercisesHeaderProps {
  title: string;
  display?: string;
  mobileHidden?: boolean;
}

export const ExercisesHeader = (props: ExercisesHeaderProps) => {
  const { title, mobileHidden = false } = props;
  return (
    <Table.ColumnHeader
      align="center"
      color={"primary"}
      {...(mobileHidden ? { display: { base: "none", md: "table-cell" } } : {})}
    >
      <Text my={2} px={6} textAlign="center">
        {title}
      </Text>
    </Table.ColumnHeader>
  );
};

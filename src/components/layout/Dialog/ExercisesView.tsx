import type { UserExerciseWithExercise } from "@/db/schema";
import { formatDuration, formatTime } from "@/helpers/date";
import {
  AbsoluteCenter,
  Flex,
  For,
  Grid,
  ProgressCircle,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { CardItem, CardItemData } from "../Card/CardItem";

type ExercisesViewProps = {
  item: UserExerciseWithExercise;
  progress: number;
  remaining: number;
};

export const ExercisesTaskView = ({
  item,
  progress,
  remaining,
}: ExercisesViewProps) => {
  const EXERCISES_DIALOG_DATA: CardItemData[] = [
    {
      title: "Total Duration:",
      value: formatDuration(item.user_exercises.durationSeconds),
    },
    {
      title: "Total Load:",
      value: `${item.user_exercises.load} ${item.user_exercises.unit}`,
    },
  ];

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gap={4}
      my={4}
      w="full"
    >
      <Flex direction="column" gap={4}>
        <For each={EXERCISES_DIALOG_DATA}>
          {(item) => (
            <CardItem
              key={item.title}
              title={item.title}
              value={item.value.toString()}
              vertical
              type="secondary"
            />
          )}
        </For>
      </Flex>
      <Flex direction="column" gap={4} align="center" justify="center">
        <ProgressCircle.Root size="lg" value={progress}>
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range stroke="secondary" />
          </ProgressCircle.Circle>
          <AbsoluteCenter>
            <ProgressCircle.ValueText color="primary" />
          </AbsoluteCenter>
        </ProgressCircle.Root>
        <Text fontSize="sm" fontWeight="bold" color="text">
          {formatTime(remaining)}
        </Text>
      </Flex>
    </Grid>
  );
};

export const ExercisesDoneView = () => {
  return (
    <Flex direction="column" gap={2} align="center" justify="center">
      <Spinner size="md" color="primary" m={6} style={{ borderWidth: "3px" }} />
      <Text fontSize="sm" fontWeight="bold" color="primary" textAlign="center">
        Congratulations!
      </Text>
      <Text fontSize="xs" color="secondary" textAlign="center">
        You have completed the exercise. Please wait while we process your data.
      </Text>
    </Flex>
  );
};

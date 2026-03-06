import { useCallback, useState } from "react";
import { EXERCISE_STATUS } from "@/consts";
import { UserExerciseWithExercise } from "@/db/schema";
import { formatDuration } from "@/helpers/date";
import { For, Spinner, Table, Text } from "@chakra-ui/react";
import { ExercisesDialog } from "@/components/layout/Dialog/ExercisesDialog";
import { Button } from "@/components/ui";
import { useUpdateUserExercise } from "@/hooks/db/useUpdateUserExercise";

interface ExercisesItemProps {
  item: UserExerciseWithExercise;
  disableAllButtons: boolean;
  setDisabledAllButtons: (disabled: boolean) => void;
}

export const ExercisesItem = ({
  item,
  disableAllButtons,
  setDisabledAllButtons,
}: ExercisesItemProps) => {
  const { mutate: updateUserExercise, isPending: isUpdatingUserExercise } =
    useUpdateUserExercise();
  const [dialogOpen, setDialogOpen] = useState(false);

  const status = item.user_exercises.status;
  const isDone = status === EXERCISE_STATUS.DONE;
  const isTodo = status === EXERCISE_STATUS.TODO;

  const handleStartClick = useCallback(() => {
    setDisabledAllButtons(true);
    updateUserExercise(
      {
        taskId: item.user_exercises.taskId,
        status: EXERCISE_STATUS.STARTED,
      },
      {
        onSuccess: () => setDialogOpen(true),
        onSettled: () => setDisabledAllButtons(false),
      },
    );
  }, [item.user_exercises.taskId, updateUserExercise, setDisabledAllButtons]);

  const actionContent = !isDone && (
    <>
      <Button
        variant={isTodo ? "success" : "warning"}
        size="xs"
        minW="88px"
        disabled={isUpdatingUserExercise || disableAllButtons}
        onClick={handleStartClick}
      >
        {isUpdatingUserExercise ? (
          <Spinner size="xs" />
        ) : isTodo ? (
          "Start"
        ) : (
          "Continue"
        )}
      </Button>
      <ExercisesDialog
        item={item}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );

  const CELL_CONTENT = [
    { value: item.exercises.title },
    { value: formatDuration(item.user_exercises.durationSeconds) },
    { value: `${item.user_exercises.load} ${item.user_exercises.unit}` },
    { value: status },
    { value: actionContent },
  ];

  return (
    <Table.Row my={2} gap={4}>
      <For each={CELL_CONTENT}>
        {(content) => (
          <Table.Cell
            align="center"
            my={2}
            px={4}
            key={content.value.toString()}
          >
            <Text textAlign="center" my={2} px={4} fontSize="sm" color="text">
              {content.value}
            </Text>
          </Table.Cell>
        )}
      </For>
    </Table.Row>
  );
};

ExercisesItem.displayName = "ExercisesItem";

export const NoExercisesItem = () => {
  return (
    <Table.Row>
      <Table.Cell
        colSpan={5}
        align="center"
        my={2}
        px={4}
        h="40px"
        gap={4}
        alignItems="center"
        w="full"
      >
        <Text
          my={2}
          px={4}
          fontSize="xs"
          color="textSecondary"
          textAlign="center"
        >
          No exercises found
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

export const LoadingExercisesItem = () => {
  return (
    <Table.Row>
      <Table.Cell
        colSpan={5}
        align="center"
        my={6}
        px={4}
        h="40px"
        gap={4}
        alignItems="center"
        w="full"
        textAlign="center"
      >
        <Spinner size="sm" color="primary" m={6} />
      </Table.Cell>
    </Table.Row>
  );
};

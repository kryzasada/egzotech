"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EXERCISE_STATUS } from "@/consts";
import type { UserExerciseWithExercise } from "@/db/schema";
import { CloseButton, Dialog, Portal, Separator } from "@chakra-ui/react";
import { useUpdateUserExercise } from "@/hooks/db";
import { ExercisesDoneView, ExercisesTaskView } from "./ExercisesView";

type ExercisesDialogProps = {
  item: UserExerciseWithExercise;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ExercisesDialog = ({
  item,
  open: controlledOpen,
  onOpenChange,
}: ExercisesDialogProps) => {
  const [elapsed, setElapsed] = useState(0);
  const { mutate: updateUserExercise, isPending: isUpdatingUserExercise } =
    useUpdateUserExercise();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const durationSeconds = item.user_exercises.durationSeconds;
  const open = controlledOpen;

  const progress = useMemo(
    () => (durationSeconds > 0 ? (elapsed / durationSeconds) * 100 : 0),
    [elapsed, durationSeconds],
  );
  const remaining = useMemo(
    () => Math.max(0, durationSeconds - elapsed),
    [elapsed, durationSeconds],
  );

  useEffect(() => {
    if (!open) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= durationSeconds) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          updateUserExercise(
            {
              taskId: item.user_exercises.taskId,
              status: EXERCISE_STATUS.DONE,
            },
            { onSuccess: () => onOpenChange(false) },
          );
          return next;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    open,
    durationSeconds,
    item.user_exercises.taskId,
    updateUserExercise,
    onOpenChange,
  ]);

  const handleOpenChange = useCallback(
    (details: { open: boolean }) => {
      onOpenChange(details.open);
      if (!details.open) setElapsed(0);
    },
    [onOpenChange],
  );

  return (
    <Dialog.Root
      role="alertdialog"
      placement="center"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Portal>
        <Dialog.Positioner bg="#ebf5f799" color="text">
          <Dialog.Content borderWidth={0} shadow="xs">
            <Dialog.Header>
              <Dialog.Title>{item.exercises.title}</Dialog.Title>
            </Dialog.Header>
            <Separator color="background" />
            <Dialog.Body>
              {isUpdatingUserExercise ? (
                <ExercisesDoneView />
              ) : (
                <ExercisesTaskView
                  item={item}
                  progress={progress}
                  remaining={remaining}
                />
              )}
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="md" m={3} color="danger" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

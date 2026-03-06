"use client";

import { useState } from "react";
import { Flex, Heading, Table } from "@chakra-ui/react";
import { Card } from "@/components/ui";
import { useUserExercises } from "@/hooks/db";
import { ExercisesHeader } from "./ExercisesHeader";
import {
  ExercisesErrorItem,
  ExercisesItem,
  LoadingExercisesItem,
  NoExercisesItem,
} from "./ExercisesItem";

export const DailyExercisesCard = () => {
  const { data: userExercises = [], isLoading, isError } = useUserExercises();
  const [disabled, setDisabled] = useState(false);

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
                <ExercisesHeader title="Name" />
                <ExercisesHeader title="Time" />
                <ExercisesHeader title="Load" />
                <ExercisesHeader title="Status" />
                <ExercisesHeader title="Action" />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {isLoading && <LoadingExercisesItem />}
              {!isLoading && isError && <ExercisesErrorItem />}
              {!isLoading &&
                !isError &&
                (userExercises?.length > 0 ? (
                  userExercises?.map((item) => (
                    <ExercisesItem
                      key={item.user_exercises.taskId}
                      item={item}
                      disableAllButtons={disabled}
                      setDisabledAllButtons={setDisabled}
                    />
                  ))
                ) : (
                  <NoExercisesItem />
                ))}
            </Table.Body>
          </Table.Root>
        </Flex>
      </Flex>
    </Card>
  );
};

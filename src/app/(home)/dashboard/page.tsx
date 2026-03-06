import { Flex, Grid } from "@chakra-ui/react";
import { ProfileCard } from "@/components/layout";
import {
  DailyExercisesCard,
  PersonalInformationCard,
} from "@/components/layout";

export const DashboardPage = () => {
  return (
    <Grid templateColumns={{ base: "1fr", xl: "1fr 3fr" }} gap={4} w="full">
      <Grid
        direction="column"
        gap={4}
        templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "1fr" }}
      >
        <ProfileCard />
        <PersonalInformationCard />
      </Grid>
      <Flex direction="column" gap={4}>
        <DailyExercisesCard />
      </Flex>
    </Grid>
  );
};

export default DashboardPage;

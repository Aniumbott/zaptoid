// Import Modules
import { Card, Group, Skeleton } from "@mantine/core";
import style from "./home.module.css";

export default function PersonCardSkeleton() {
  return (
    <>
      <Card shadow="sm" padding="xs" radius="xl">
        <Group position="apart">
          <Skeleton circle height="2.375rem" />
          <div className={style.personDetails}>
            <Skeleton height={14} radius="xl" width="80%" />
            <Skeleton height={10} mt={6} radius="xl" width="50%" />
          </div>
        </Group>
      </Card>
    </>
  );
}

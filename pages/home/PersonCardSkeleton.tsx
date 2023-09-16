import { Card, Group, Skeleton } from "@mantine/core";

export default function PersonCardSkeleton() {
  return (
    <>
      <Card shadow="sm" padding="xs" radius="xl">
        <Group position="apart">
          <Skeleton circle height="2.375rem" />
          <div className="person-details">
            <Skeleton height={14} radius="xl" width="80%" />
            <Skeleton height={10} mt={6} radius="xl" width="50%" />
          </div>
        </Group>
      </Card>
      <style>
        {`
            .person-details {
              display: flex;
              flex-direction: column;
              justify-content: left;
              width: 10rem;
            }
          `}
      </style>
    </>
  );
}

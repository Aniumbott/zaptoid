// Import Modules
import { Card, Text, Badge, Group, Avatar } from "@mantine/core";

// Custom Types
type color = "blue" | "red" | "green" | "yellow" | "gray";

// Export Module
export default function PersonCard(props: any) {
  const { person } = props;

  return (
    <>
      <Card
        shadow="sm"
        padding="xs"
        radius="xl"
        onClick={() => console.log("clicked")}
      >
        <Group position="apart">
          <Avatar
            size="md"
            radius="xl"
            color={
              person.name.split(" ").length > 1
                ? (person.name.split(" ")[1][0].toLowerCase() as color)
                : "blue"
            }
          >
            {person.name.split(" ").map((n: string) => n[0])}
          </Avatar>
          <div className="person-details">
            <Text size="sm">
              <b>{person.name}</b>
            </Text>
            <Text size="xs" c="dimmed">
              {person.phone[0] ? person.phone[0] : "(none)"}
            </Text>
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
    .relations {
      display: flex;
      flex-direction: row;
      justify-content: left;
      flex-wrap: wrap;
      width: 100%;
    }
    .direct-relation{
      max-width: 5rem;
      overflow: hidden;
    }
    `}
      </style>
    </>
  );
}

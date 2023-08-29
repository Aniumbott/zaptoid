// Import Modules
import { Person } from "@/prisma/dbTypes";
import { Card, Text, Group, Avatar } from "@mantine/core";

// Custom Types
type color = "blue" | "red" | "green" | "yellow" | "gray";

// Export Module
export default function PersonCard(props: { person: Person }) {
  const person = props.person
    ? props.person
    : ({
        id: "",
        name: "",
        email: [],
        phone: [],
        description: "",
        userId: "",
      } as Person);

  return (
    <>
      <Card
        shadow="sm"
        padding="xs"
        radius="xl"
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
              {person.phone.length > 0 ? Number(person.phone[0]) : "(none)"}
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

// Import Modules
import { Card, Text, Group, Avatar } from "@mantine/core";

// Import Components
import { Person, color } from "@/src/types";
import style from "./home.module.css";

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
      <Card shadow="sm" padding="xs" radius="xl" className={style.personCard}>
        <Group position="apart">
          <Avatar
            size="md"
            radius="xl"
            color={
              person.name.split(" ").length > 1
                ? color[
                    person.name.split(" ")[0][0].toLowerCase().charCodeAt(0) %
                      color.length
                  ]
                : "blue"
            }
          >
            {person.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .substring(0, 2)}
          </Avatar>
          <div className={style.personDetails}>
            <Text size="sm">
              <b>{person.name}</b>
            </Text>
            <Text size="xs" c="dimmed">
              {person.phone.length > 0 ? Number(person.phone[0]) : "(none)"}
            </Text>
          </div>
        </Group>
      </Card>
    </>
  );
}

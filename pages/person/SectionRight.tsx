// import Modules
import { useRouter } from "next/router";
import { Card, Title, Text, Button, Textarea } from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconEdit,
  IconX,
  IconTrash,
  IconCheck,
} from "@tabler/icons-react";

// Import Components
import { Person, personDefault, Relation } from "@/prisma/dbTypes";
import RelationTabs from "./RelationTabs";

// Export Module
export default function SectionRight(props: {
  person: Person;
  persons: Person[];
  relations: Relation[];
  editable: boolean;
  setEditable: Function;
}) {
  const person = props.person || personDefault;
  const { persons, relations, editable, setEditable } = props;
  const router = useRouter();

  return (
    <>
      <div className="section-right">
        <Card style={{ width: "100%", height: "100%" }}>
          <div className="description-container">
            <Title order={4}>Description</Title>
            {editable ? (
              // Description Input
              <Textarea
                defaultValue={person.description}
                placeholder="Anything special?"
                radius="md"
              />
            ) : person.description ? (
              <Text>{person.description}</Text>
            ) : (
              <Text size="sm" color="dimmed">
                (none)
              </Text>
            )}
          </div>
          <div className="relations-container">
            <Title order={4}>Relations</Title>
            <div className="relation-tabs">
              <RelationTabs
                relations={relations}
                persons={persons}
                editable={editable}
              />
            </div>
          </div>
          {editable ? (
            <div>
              <Button
                variant="light"
                radius="xl"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  margin: "1rem",
                }}
                // onClick={}
                color="red"
              >
                <IconTrash /> Delete
              </Button>
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  margin: "1rem",
                }}
              >
                <Button
                  variant="light"
                  onClick={() => setEditable(!editable)}
                  radius="xl"
                  color="red"
                >
                  <IconX /> Cancel
                </Button>
                <Button
                  variant="light"
                  // onClick={}
                  type="submit"
                  style={{ marginLeft: "1rem" }}
                  radius="xl"
                >
                  <IconCheck /> Save
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Button
                variant="subtle"
                radius="xl"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  margin: "1rem",
                }}
                onClick={() => router.back()}
              >
                <IconArrowNarrowLeft />
                Back
              </Button>
              <Button
                variant="subtle"
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  margin: "1rem",
                }}
                onClick={() => setEditable(!editable)}
                radius="xl"
              >
                <IconEdit /> Edit
              </Button>
            </div>
          )}
        </Card>
      </div>
      <style jsx>{`
        .section-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 30rem;
          height: 100%;
          padding: 1.5rem;
          width: 100%;
        }

        .description-container,
        .relations-container {
          margin-bottom: 1rem;
        }

        .relation-tabs {
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
}

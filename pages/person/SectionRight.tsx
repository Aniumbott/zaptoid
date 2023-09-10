// import Modules
import { useRouter } from "next/router";
import { Card, Title, Text, Button, Textarea, Tooltip } from "@mantine/core";

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
  form: any;
}) {
  const person = props.person || personDefault;
  const { persons, relations, editable, setEditable, form } = props;
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
                placeholder="Anything special?"
                radius="md"
                {...form.getInputProps("description")}
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
                form={form}
              />
            </div>
          </div>
          {editable ? (
            <div>
              <Tooltip label="Delete this person">
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
                  Delete
                </Button>
              </Tooltip>
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  margin: "1rem",
                }}
              >
                <Tooltip label="Cancel the changes">
                  <Button
                    variant="light"
                    onClick={() => setEditable(!editable)}
                    radius="xl"
                    color="red"
                  >
                    Cancel
                  </Button>
                </Tooltip>
                <Tooltip label="Save the changes">
                  <Button
                    variant="light"
                    // onClick={}
                    type="submit"
                    style={{ marginLeft: "1rem" }}
                    radius="xl"
                  >
                    Save
                  </Button>
                </Tooltip>
              </div>
            </div>
          ) : (
            <div>
              <Tooltip label="Go back to the previous page">
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
                  Back
                </Button>
              </Tooltip>
              <Tooltip label="Edit this person">
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
                  {" "}
                  Edit
                </Button>
              </Tooltip>
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

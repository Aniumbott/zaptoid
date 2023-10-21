// import Modules
import { useRouter } from "next/router";
import { Card, Title, Text, Button, Textarea, Tooltip } from "@mantine/core";

// Import Components
import {
  CurrentUser,
  currentUserDefault,
  Person,
  personDefault,
} from "@/src/types";
import RelationTabs from "./RelationTabs";
import style from "./person.module.css";

// Export Module
export default function SectionRight(props: {
  person: Person;
  currentUser: CurrentUser;
  editable: boolean;
  setEditable: Function;
  loading: boolean;
  form: any;
}) {
  const { editable, setEditable, loading, form } = props;
  const currentUser = props.currentUser || currentUserDefault;
  const person = props.person || personDefault;
  const router = useRouter();

  return (
    <>
      <div className={style.sectionRight}>
        <Card style={{ width: "100%" }}>
          <div className={style.descriptionContainer}>
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
        </Card>

        <Card
          style={{
            marginTop: "1.5rem",
            minHeight: "50vh",
            width: "100%",
            height: "100%",
            overflowY: "scroll",
          }}
          className="scrollbar-hidden"
        >
          <div className={style.relationsContainer}>
            <Title order={4}>Relations</Title>
            <div className={style.relationTabs}>
              <RelationTabs
                currentUser={currentUser}
                editable={editable}
                form={form}
              />
            </div>
          </div>

          <div className={style.buttons}>
            {editable ? (
              <>
                <Tooltip label="Delete this person">
                  <Button
                    variant="light"
                    radius="xl"
                    style={{
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
                      {loading ? "Updating..." : "Save"}
                    </Button>
                  </Tooltip>
                </div>
              </>
            ) : (
              <>
                <Tooltip label="Go back to the previous page">
                  <Button
                    variant="subtle"
                    radius="xl"
                    style={{
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
                      margin: "1rem",
                    }}
                    onClick={() => setEditable(!editable)}
                    radius="xl"
                  >
                    {" "}
                    Edit
                  </Button>
                </Tooltip>
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

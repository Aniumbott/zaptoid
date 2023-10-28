// import Modules
import { useRouter } from "next/router";
import {
  Card,
  Title,
  Text,
  Button,
  Textarea,
  Tooltip,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

// Import Components
import {
  CurrentUser,
  currentUserDefault,
  Person,
  personDefault,
} from "@/src/types";
import RelationTabs from "./RelationTabs";
import style from "./person.module.css";
import { updateRelation, deletePerson } from "@/src/dbFunctions";

// Export Module
export default function SectionRight(props: {
  person: Person;
  currentUser: CurrentUser;
  editable: boolean;
  setEditable: Function;
  form: any;
}) {
  const { editable, setEditable, form } = props;
  const currentUser = props.currentUser || currentUserDefault;
  const person = props.person || personDefault;
  const router = useRouter();

  // Functions
  function deletePersonHandle(id: string) {
    // First delete all his relations
    if (confirm("Are you sure you want to delete this person? \nNote: All the details related to this person will be deleted as well.")) {
      const deletables = currentUser.relations.filter((relation) => {
        return relation.ofPersonId === id || relation.isPersonId === id;
      });
      notifications.show({
        loading: true,
        message: "Deleting Person...",
        autoClose: false,
        withCloseButton: false,
        id: "deleting",
        withBorder: true,
      });
      Promise.all(
        deletables?.map((relation) => {
          updateRelation({ task: "delete", ...relation });
        })
      ).then(() => {
        deletePerson(id).then(() => {
          notifications.update({
            id: "deleting",
            color: "teal",
            message: "Person Deleted Succefully.",
            icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
            loading: false,
            autoClose: 3000,
            withBorder: true,
          });
          router.push("/");
        });
      });
    }
  }

  return (
    <>
      <div className={style.sectionRight}>
        <Card className={style.descriptionContainer} style={{}}>
          <Title order={4}>Description</Title>
          {editable ? (
            // Description Input
            <Textarea
              style={{ marginTop: "0.5rem" }}
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
        </Card>

        <Card className={`${style.relationsContainer} scrollbar-hidden`}>
          <div style={{ width: "100%" }}>
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
                    onClick={() => deletePersonHandle(person.id)}
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
                      Save
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

// Import Modules
import {
  Avatar,
  Card,
  Title,
  Text,
  Button,
  CopyButton,
  Tooltip,
} from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Person } from "@/prisma/dbTypes";
import { useEffect } from "react";

// Custom Types
type color = "blue" | "red" | "green" | "yellow" | "gray";

// Export Module
export default function SectionLeft(props: { person: Person; editable: boolean }) {
  const { person, editable } = props;
  useEffect(() => {
    console.log(person);
  }, [person]);
  return (
    <>
      <div className="section-left">
        <div className="person-image">
          <Avatar
            size={150}
            radius={150}
            variant="filled"
            color={
              person.name.split(" ").length > 1
                ? (person.name.split(" ")[1][0].toLowerCase() as color)
                : "blue"
            }
          >
            {person.name.split(" ").map((n: string) => n[0])}
          </Avatar>
        </div>
        <Card style={{ width: "100%", height: "100%", paddingTop: "90px" }}>
          <div className="person-name">
            {editable ? (
              <TextInput
                defaultValue={person.name}
                placeholder="Full Name"
                label="Person name"
                withAsterisk
              />
            ) : (
              <Title order={2}> {person.name}</Title>
            )}
          </div>
          <div className="phone-container">
            <Title order={4}> Phone</Title>
            {person.phone.length > 0 ? (
              editable ? (
                person.phone.map((phone: String, key: number) => {
                  return <Text key={key}>comming soon...</Text>; // Multi Input yet to come
                })
              ) : (
                person.phone.map((phone: String) => {
                  return (
                    <CopyButton value={`${phone}`}>
                      {({ copied, copy }) => (
                        <Tooltip label="copy" position="bottom">
                          <Button
                            color={copied ? "teal" : "primary"}
                            onClick={copy}
                            variant="subtle"
                            compact
                          >
                            {copied ? "copied" : `${phone}`}
                          </Button>
                        </Tooltip>
                      )}
                    </CopyButton>
                  );
                })
              )
            ) : (
              <Text size="sm" color="dimmed">
                (none)
              </Text>
            )}
          </div>

          <div className="email-container">
            <Title order={4}> E-Mail</Title>
            {person.email.length > 0 ? (
              editable ? (
                person.email.map((email: string, key: number) => {
                  return <Text key={key}>comming soon...</Text>; // Multi Input yet to come
                })
              ) : (
                person.email.map((email: string) => {
                  return (
                    <CopyButton value={`${email}`}>
                      {({ copied, copy }) => (
                        <Tooltip label="copy" position="bottom">
                          <Button
                            color={copied ? "teal" : "primary"}
                            onClick={copy}
                            variant="subtle"
                            compact
                          >
                            {copied ? "copied" : `${email}`}
                          </Button>
                        </Tooltip>
                      )}
                    </CopyButton>
                  );
                })
              )
            ) : (
              <Text size="sm" color="dimmed">
                (none)
              </Text>
            )}
          </div>
        </Card>
      </div>
      <style jsx>{`
        .person-image {
          position: absolute;
          top: -75px;
          left: 100px;
          z-index: 1;
        }
        .section-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 30rem;
          height: 100%;
          padding: 1.5rem;
        }
        .person-name,
        .phone-container,
        .email-container {
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );


}

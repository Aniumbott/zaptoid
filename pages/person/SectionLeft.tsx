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

// Import Components
import { Person, personDefault, color } from "@/src/types";
import MultiInput from "./MultiInput";
import style from "./person.module.css";

// Export Module
export default function SectionLeft(props: {
  person: Person;
  editable: boolean;
  form: any;
}) {
  const person = props.person || personDefault;
  const { editable, form } = props;

  return (
    <>
      <div className={style.sectionLeft}>
        <div className={style.personImage}>
          <Avatar
            size={150}
            radius={150}
            variant="filled"
            alt={`${form?.values.name} avatar`}
            color={
              form && form.values.name.split(" ").length > 1
                ? color[
                    form.values.name
                      .split(" ")[0][0]
                      .toLowerCase()
                      .charCodeAt(0) % color.length
                  ]
                : "blue"
            }
          >
            {form?.values.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .substring(0, 2)}
          </Avatar>
        </div>
        <Card
          style={{
            width: "100%",
            height: "100%",
            paddingTop: "90px",
            overflowY: "scroll",
          }}
          className="scrollbar-hidden"
        >
          <div className={style.personName}>
            {editable ? (
              // Name Input
              <TextInput
                value={person.name}
                placeholder="Full Name"
                label="Person name"
                radius="md"
                {...form.getInputProps(`name`)}
              />
            ) : (
              <Title order={2}> {person.name}</Title>
            )}
          </div>
          <div className={style.phoneContainer}>
            <Title order={4}> Phone</Title>
            {editable ? (
              <MultiInput form={form} variant="phones" /> // Phone Input
            ) : person.phone.length > 0 ? (
              person.phone.map((phone: String, key) => {
                return (
                  <CopyButton value={`${phone}`} key={key}>
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
            ) : (
              <Text size="sm" color="dimmed">
                (none)
              </Text>
            )}
          </div>

          <div className={style.emailContainer}>
            <Title order={4}> E-Mail</Title>
            {editable ? (
              <MultiInput form={form} variant="email" /> // Email Input
            ) : person.email.length > 0 ? (
              person.email.map((email: string, key) => {
                return (
                  <CopyButton value={`${email}`} key={key}>
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
            ) : (
              <Text size="sm" color="dimmed">
                (none)
              </Text>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

// Import Modules
import { Button, TextInput, ActionIcon } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

// Export Module
export default function MultiInput(props: { form: any; variant: string }) {
  const { variant } = props;
  const form =
    props.form ||
    useForm({
      initialValues: {
        phones: [{ number: "" }],
        emails: [{ email: "" }],
      },
    }); // Form object
  return (
    <>
      <div className="multi-input-container">
        {variant === "phones" ? (
          <>
            {form.values.phones.map((input: any, key: any) => {
              //Input for phone numbers
              return (
                <div className="input-container" key={key}>
                  <TextInput
                    style={{ width: "100%", marginRight: "1rem" }}
                    radius="md"
                    placeholder="Phone Number"
                    {...form.getInputProps(`phones.${key}.number`)}
                  />
                  <ActionIcon
                    color="red"
                    onClick={() => form.removeListItem("phones", key)}
                    radius="md"
                  >
                    <IconTrash size="1rem" />
                  </ActionIcon>
                </div>
              );
            })}
            <Button
              onClick={() => {
                if (form.values.phones.length < 5) {
                  form.insertListItem("phones", { number: "" });
                } else {
                  alert("Maximum 5 phone numbers allowed");
                }
              }}
              variant="light"
              radius="md"
            >
              <IconPlus />
            </Button>
          </>
        ) : (
          <>
            {form.values.emails.map((input: any, key: any) => {
              // Input for email ids
              return (
                <div className="input-container" key={key}>
                  <TextInput
                    style={{ width: "100%", marginRight: "1rem" }}
                    radius="md"
                    placeholder="Email Id"
                    {...form.getInputProps(`emails.${key}.email`)}
                  />
                  <ActionIcon
                    color="red"
                    onClick={() => form.removeListItem("emails", key)}
                    radius="md"
                  >
                    <IconTrash size="1rem" />
                  </ActionIcon>
                </div>
              );
            })}
            <Button
              onClick={() => {
                if (form.values.emails.length < 5) {
                  form.insertListItem("emails", { email: "" });
                } else {
                  alert("Maximum 5 email ids allowed");
                }
              }}
              variant="light"
              radius="md"
            >
              <IconPlus />
            </Button>
          </>
        )}
      </div>
      <style jsx>{`
        .multi-input-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: right;
        }
        .input-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );
}

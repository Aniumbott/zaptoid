// Import Modules
import { CurrentUser, currentUserDefault, Role } from "@/prisma/types";
import { Button, Select, ActionIcon } from "@mantine/core";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

// Export Module
export default function RelationsInput(props: {
  variant: string;
  form: any;
  currentUser: CurrentUser;
}) {
  const { variant } = props;
  const currentUser = props.currentUser || currentUserDefault; // Current user object
  const form =
    props.form ||
    useForm({
      initialValues: {
        relationsD: [{ roleId: "", ofPersonId: "" }],
        relationsI: [{ isPersonId: "", roleId: "" }],
      },
    }); // Form object
  return (
    <>
      {variant === "direct"
        ? form.values.relationsD.map((relation: any, key: string) => {
            // Direct Relation Input
            return (
              <tr key={key}>
                <td>
                  <Select
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={relation.roleId}
                    data={currentUser.roles.map((role: Role) => {
                      return {
                        value: role.id || "xyz",
                        label: role.name || "",
                      };
                    })}
                    searchable
                    radius="md"
                    key={key}
                    maxDropdownHeight={280}
                    {...form.getInputProps(`relationsD.${key}.roleId`)}
                  />
                </td>
                <td>
                  <Select
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={relation.ofPersonId}
                    data={
                      currentUser.persons.map((person) => {
                        return {
                          value: person.id || "xyz",
                          label: person.name || "",
                        };
                      }) || []
                    }
                    searchable
                    radius="md"
                    key={key}
                    maxDropdownHeight={280}
                    {...form.getInputProps(`relationsD.${key}.ofPersonId`)}
                  />
                </td>
                <td>
                  <ActionIcon
                    color="red"
                    key={key}
                    onClick={() => {
                      form.removeListItem("relationsD", key);
                    }}
                    radius="md"
                  >
                    <IconTrash size="1rem" />
                  </ActionIcon>
                </td>
              </tr>
            );
          })
        : form.values.relationsI.map((relation: any, key: string) => {
            // Direct Relation Input
            return (
              <tr key={key}>
                <td>
                  <Select
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={relation.isPersonId}
                    data={
                      currentUser.persons.map((person) => {
                        return {
                          value: person.id || "xyz",
                          label: person.name || "",
                        };
                      }) || []
                    }
                    searchable
                    radius="md"
                    key={key}
                    maxDropdownHeight={280}
                    {...form.getInputProps(`relationsI.${key}.isPersonId`)}
                  />
                </td>
                <td>
                  <Select
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={relation.roleId}
                    data={currentUser.roles.map((role: Role) => {
                      return {
                        value: role.id || "xyz",
                        label: role.name || "",
                      };
                    })}
                    searchable
                    radius="md"
                    key={key}
                    maxDropdownHeight={280}
                    {...form.getInputProps(`relationsI.${key}.roleId`)}
                  />
                </td>
                <td>
                  <ActionIcon
                    color="red"
                    key={key}
                    onClick={() => {
                      form.removeListItem("relationsI", key);
                    }}
                    radius="md"
                  >
                    <IconTrash size="1rem" />
                  </ActionIcon>
                </td>
              </tr>
            );
          })}

      <tr>
        <td colSpan={2}>
          <Button // Add new relation
            onClick={() => {
              if (variant === "direct") {
                form.insertListItem(
                  "relationsD",
                  {
                    roleId: "",
                    ofPersonId: "",
                  },
                  form.values.relationsD.length
                );
              } else {
                form.insertListItem(
                  "relationsI",
                  {
                    roleId: "",
                    isPersonId: "",
                  },
                  form.values.relationsI.length
                );
              }
            }}
            style={{ width: "100%" }}
            variant="light"
            radius="md"
          >
            <IconPlus />
          </Button>
        </td>
      </tr>
    </>
  );
}

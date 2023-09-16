// Import Modules
import { Relation, Person } from "@/prisma/dbTypes";
import { Button, Select, ActionIcon } from "@mantine/core";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";

// Export Module
export default function RelationsInput(props: { variant: string; form: any }) {
  const { variant } = props;
  const router = useRouter();
  const form =
    props.form ||
    useForm({
      initialValues: {
        relationsD: [
          {
            name: "",
            ofPersonId: "",
          },
        ],
        relationsI: [
          {
            name: "",
            isPersonId: "",
          },
        ],
      },
    });
  const [relations, setRelations] = useState([
    {
      name: "",
      isPersonId: "",
      ofPersonId: "",
      isPersonName: "",
      ofPersonName: "",
    },
  ]);
  const [persons, setPersons] = useState<Person[]>([
    {
      id: "",
      name: "",
      phone: [""],
      email: [""],
      description: "",
      userId: "",
    },
  ]);

  // Event Handlers
  // Fetch all the persons and update the state
  useEffect(() => {
    const getPersons = JSON.parse(localStorage.getItem("persons") || "");
    const getRelations = JSON.parse(localStorage.getItem("relations") || "");
    if (getPersons) {
      setPersons(getPersons);
      if (getRelations) {
        const mappedRelations = getRelations.map((relation: Relation) => {
          return {
            name: relation.name,
            isPersonId: relation.isPersonId,
            ofPersonId: relation.ofPersonId,
            isPersonName:
              getPersons.filter(
                (person: Person) => person.id === relation.isPersonId
              )[0].name || "",
            ofPersonName:
              getPersons.filter(
                (person: Person) => person.id === relation.ofPersonId
              )[0].name || "",
          };
        });
        setRelations(mappedRelations);
      }
    }
  }, []);

  return (
    <>
      {variant === "direct"
        ? form.values.relationsD.map((relation: any, key: any) => {
            // Direct Relation Input
            return (
              <tr key={key}>
                <td>
                  <Select
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={relation.name}
                    data={relations
                      .map((relation: any) => relation.name)
                      .filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                      })}
                    searchable
                    radius="md"
                    key={key}
                    maxDropdownHeight={280}
                    {...form.getInputProps(`relationsD.${key}.name`)}
                  />
                </td>
                <td>
                  <Select
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={relation.ofPersonId}
                    data={persons.map((person) => {
                      return {
                        value: person.id,
                        label: person.name || "",
                      };
                    })}
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
        : form.values.relationsI.map((relation: any, key: any) => {
            // Indirect Relation Input
            return (
              <tr key={key}>
                <td>
                  <Select
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={relation.isPersonId}
                    data={persons.map((person) => {
                      return {
                        value: person.id,
                        label: person.name || "",
                      };
                    })}
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
                    value={relation.name}
                    data={relations
                      .map((relation: any) => relation.name)
                      .filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                      })}
                    searchable
                    radius="md"
                    key={key}
                    maxDropdownHeight={280}
                    {...form.getInputProps(`relationsI.${key}.name`)}
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
                    name: "",
                    ofPersonId: "",
                  },
                  form.values.relationsD.length
                );
              } else {
                form.insertListItem(
                  "relationsI",
                  {
                    name: "",
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

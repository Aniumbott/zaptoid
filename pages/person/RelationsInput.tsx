// Import Modules
import { Relation, Person, relationDefault } from "@/prisma/dbTypes";
import { Button, Select } from "@mantine/core";
import { IconX, IconPlus } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Import Components
import { personDefault } from "@/prisma/dbTypes";

// Type Definitions
type Input = {
  name: string;
  personId: string;
  personName: string;
};

type Variant = "direct" | "indirect";

// Export Module
export default function RelationsInput(props: {
  existing: Input[];
  variant: Variant;
}) {
  const { existing, variant } = props;
  const router = useRouter();
  const [persons, setPersons] = useState<Person[]>([personDefault]);
  const [relations, setRelations] = useState<Relation[]>([]);
  const [inputs, setInputs] = useState<Input[]>(existing);

  // Event Handlers
  // Fetch all the persons and update the state
  useEffect(() => {
    const getPersons = JSON.parse(localStorage.getItem("persons") || "");
    const getRelations = JSON.parse(localStorage.getItem("relations") || "");
    if (getPersons) {
      setPersons(
        getPersons.filter(
          (person: Person) => person.id !== router.query.personId
        )
      );
    }
    if (getRelations) {
      setRelations(getRelations);
    }
  }, []);

  return (
    <>
      {variant === "direct"
        ? inputs.map((input, key) => {
            return (
              <tr key={key}>
                <td>
                  <Select
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={input.name}
                    data={relations.map((relation: Relation) => relation.name)}
                    searchable
                    radius="md"
                    key={key}
                    onChange={(e) => {
                      const newInputs = [...inputs];
                      newInputs[key].name = e || "";
                      setInputs(newInputs);
                    }}
                  />
                </td>
                <td>
                  <Select
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={input.personName}
                    data={persons.map((person: Person) => {
                      return person.name;
                    })}
                    searchable
                    radius="md"
                    key={key}
                    onChange={(e) => {
                      const newInputs = [...inputs];
                      newInputs[key].personName = e || "";
                      newInputs[key].personId = persons.filter(
                        (person: Person) => person.name === e
                      )[0].id;
                      setInputs(newInputs);
                    }}
                  />
                </td>
                <td>
                  <Button
                    color="red"
                    variant="light"
                    key={key}
                    onClick={() => {
                      const newInputs = [...inputs];
                      newInputs.splice(key, 1);
                      setInputs(newInputs);
                    }}
                    radius="md"
                    style={{ width: "100%" }}
                  >
                    <IconX />
                  </Button>
                </td>
              </tr>
            );
          })
        : inputs.map((input, key) => {
            return (
              <tr key={key}>
                <td>
                  <Select
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={input.personName}
                    data={persons.map((person: Person) => {
                      return person.name;
                    })}
                    searchable
                    radius="md"
                    key={key}
                    onChange={(e) => {
                      const newInputs = [...inputs];
                      newInputs[key].personName = e || "";
                      newInputs[key].personId = persons.filter(
                        (person: Person) => person.name === e
                      )[0].id;
                      setInputs(newInputs);
                    }}
                  />
                </td>
                <td>
                  <Select
                    placeholder="Pick one"
                    nothingFound="No options"
                    value={input.name}
                    data={relations.map((relation: Relation) => relation.name)}
                    searchable
                    radius="md"
                    key={key}
                    onChange={(e) => {
                      const newInputs = [...inputs];
                      newInputs[key].name = e || "";
                      setInputs(newInputs);
                    }}
                  />
                </td>

                <td>
                  <Button
                    color="red"
                    variant="light"
                    onClick={() => {
                      const newInputs = [...inputs];
                      newInputs.splice(key, 1);
                      setInputs(newInputs);
                    }}
                    radius="md"
                    style={{ width: "100%" }}
                  >
                    <IconX />
                  </Button>
                </td>
              </tr>
            );
          })}
      <tr>
        <td colSpan={3}>
          <Button
            onClick={() => {
              setInputs([
                ...inputs,
                { name: "", personId: "", personName: "" },
              ]);
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

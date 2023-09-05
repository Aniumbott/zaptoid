// Import Modules
import { Person, Relation } from "@/prisma/dbTypes";
import { Anchor, Badge, Table, Tabs, Title } from "@mantine/core";
import { IconArrowsSplit2, IconArrowsJoin2 } from "@tabler/icons-react";
import { useRouter } from "next/router";

// Import Components
import RelationsInput from "./RelationsInput";

// Export Module
export default function RelationTabs(props: {
  relations: Relation[];
  persons: Person[];
  editable: boolean;
}) {
  const { relations, persons, editable } = props;
  const router = useRouter();
  
  // Classification of relations
  const relationsD = relations.filter(
    (relation: Relation) => relation.isPersonId === router.query.personId
  );
  const relationsI = relations.filter(
    (relation: Relation) => relation.ofPersonId === router.query.personId
  );

  return (
    <>
      <Tabs orientation="vertical" defaultValue="direct">
        <Tabs.List>
          <Tabs.Tab value="direct" icon={<IconArrowsSplit2 size="0.8rem" />}>
            Direct
          </Tabs.Tab>
          <Tabs.Tab value="indirect" icon={<IconArrowsJoin2 size="0.8rem" />}>
            Indirect
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="direct" pl="xs">
          <Table highlightOnHover striped>
            <tbody
              style={{
                width: "100%",
                height: "100%",
                overflowY: "scroll",
              }}
              className="scrollbar-hidden"
            >
              {editable ? (
                // Direct Relation Input
                <RelationsInput
                  existing={relationsD.map((relation: Relation) => {
                    return {
                      name: relation.name,
                      personId: relation.ofPersonId,
                      personName: persons.filter(
                        (person: Person) => person.id === relation.ofPersonId
                      )[0].name,
                    };
                  })}
                  variant="direct"
                />
              ) : relationsD ? (
                relationsD.map((relation: Relation) => {
                  return (
                    <tr key={relation.id}>
                      <td>
                        <Badge color="green">{relation.name}</Badge>
                      </td>
                      <td>
                        <Anchor
                          onClick={() => {
                            router.push(`/person/${relation.ofPersonId}`);
                          }}
                        >
                          {
                            persons.filter(
                              (person: Person) =>
                                person.id === relation.ofPersonId
                            )[0].name
                          }
                        </Anchor>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <Title order={3}>(none)</Title>
              )}
            </tbody>
          </Table>
        </Tabs.Panel>

        <Tabs.Panel value="indirect" pl="xs">
          <Table highlightOnHover striped>
            <tbody>
              {editable ? (
                // Indirect Relation Input
                <RelationsInput
                  existing={relationsI.map((relation: Relation) => {
                    return {
                      name: relation.name,
                      personId: relation.isPersonId,
                      personName: persons.filter(
                        (person: Person) => person.id === relation.isPersonId
                      )[0].name,
                    };
                  })}
                  variant="indirect"
                />
              ) : relationsI ? (
                relationsI.map((relation: Relation) => {
                  return (
                    <tr key={relation.id}>
                      <td>
                        <Anchor
                          onClick={() => {
                            router.push(`/person/${relation.isPersonId}`);
                          }}
                        >
                          {
                            persons.filter(
                              (person: Person) =>
                                person.id === relation.isPersonId
                            )[0].name
                          }
                        </Anchor>
                      </td>
                      <td>
                        <Badge color="blue">{relation.name}</Badge>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <Title order={3}>(none)</Title>
              )}
            </tbody>
          </Table>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

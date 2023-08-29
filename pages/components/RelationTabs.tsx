// Import Modules
import { Person, Relation } from "@/prisma/dbTypes";
import { Anchor, Badge, Table, Tabs } from "@mantine/core";
import { IconArrowsSplit2, IconArrowsJoin2 } from "@tabler/icons-react";
import { useRouter } from "next/router";

// Export Module
export default function RelationTabs(props: {relationsD:Relation[], relationsI:Relation[], persons:Person[]}) {
  const { relationsD, relationsI, persons } = props;
  const router = useRouter();
  return (
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
          <tbody>
            {relationsD ? relationsD.map((relation: Relation) => {
              return (
                <tr key={relation.id}>
                  <td>
                    <Badge color="green">{relation.name}</Badge>
                  </td>
                  <td>
                    <Anchor
                      onClick={() => {
                        router.push(
                          `/?personId=${relation.ofPersonId}`,
                          undefined,
                          {
                            shallow: true,
                          }
                        );
                      }}
                    >
                      {
                        persons.filter(
                          (person: Person) => person.id === relation.ofPersonId
                        )[0].name
                      }
                    </Anchor>
                  </td>
                </tr>
              );
            })
          :
          <b>NA</b>
          }
          </tbody>
        </Table>
      </Tabs.Panel>

      <Tabs.Panel value="indirect" pl="xs">
        <Table highlightOnHover striped>
          <tbody>
            {relationsI ?relationsI.map((relation: Relation) => {
              return (
                <tr key={relation.id}>
                  <td>
                    <Anchor
                      onClick={() => {
                        router.push(
                          `/?personId=${relation.isPersonId}`,
                          undefined,
                          {
                            shallow: true,
                          }
                        );
                      }}
                    >
                      {
                        persons.filter(
                          (person: Person) => person.id === relation.isPersonId
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
          :
          <b>NA</b>
          }
          </tbody>
        </Table>
      </Tabs.Panel>
    </Tabs>
  );
}

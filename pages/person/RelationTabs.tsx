// Import Modules
import {
  CurrentUser,
  currentUserDefault,
  Person,
  Relation,
  relationDefault,
} from "@/prisma/types";
import { Anchor, Badge, Table, Tabs, Title } from "@mantine/core";
import { IconArrowsSplit2, IconArrowsJoin2 } from "@tabler/icons-react";
import { useRouter } from "next/router";

// Import Components
import RelationsInput from "./RelationsInput";

// Export Module
export default function RelationTabs(props: {
  currentUser: CurrentUser;
  editable: boolean;
  form: any;
}) {
  const { editable, form } = props;
  const currentUser = props.currentUser || currentUserDefault;
  const router = useRouter();

  // Classification of relations
  const relationsD = currentUser.relations.filter(
    (relation: Relation) => relation.isPersonId === router.query.personId
  ) || [relationDefault];
  const relationsI = currentUser.relations.filter(
    (relation: Relation) => relation.ofPersonId === router.query.personId
  ) || [relationDefault];

  // Get person name from id
  function getPerson(id: string) {
    const p = currentUser.persons
      ? currentUser.persons.filter((pe: Person) => pe.id === id)[0]
      : null;
    return p ? p.name : "";
  }

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
              }}
            >
              {editable ? (
                <RelationsInput
                  form={form}
                  variant="direct"
                  currentUser={currentUser}
                /> // Direct Relation Input
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
                          {getPerson(relation.ofPersonId)}
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
                <RelationsInput
                  variant="indirect"
                  form={form}
                  currentUser={currentUser}
                /> // Indirect Relation Input
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
                          {getPerson(relation.isPersonId)}
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

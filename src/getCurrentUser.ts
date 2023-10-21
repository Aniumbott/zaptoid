// Importing components
import { Person, Role, Relation, currentUserDefault } from "./types";
import { getAllPerson, getAllRoles, getAllRelations } from "./dbFunctions";

// Function to get current user form its id
export default async function getCurrentUser(props: any) {
  const { setCurrentUser } = props;
  const currentUser = props.currentUser || currentUserDefault;
  const getAllPersonRes = getAllPerson(currentUser.id); // Get all persons
  const getAllrolesRes = getAllRoles(currentUser.id); // Get all roles
  const getAllRelationRes = getAllRelations(currentUser.id); // Get all relations
  let persons: Person[] = [];
  let roles: Role[] = [];
  let relations: Relation[] = [];

  // Consecutive API calls
  await getAllPersonRes.then((res) => {
    if (res.status === 200) {
      res
        .json()
        .then((data) => {
          persons = data.dbData;
        })
        .then(() => {
          getAllrolesRes.then((res) => {
            if (res.status === 200) {
              res
                .json()
                .then((data) => {
                  roles = data.dbData;
                })
                .then(() => {
                  getAllRelationRes.then((res) => {
                    if (res.status === 200) {
                      res
                        .json()
                        .then((data) => {
                          relations = data.dbData?.map((relation: any) => {
                            return {
                              ...relation,
                              name:
                                roles.filter(
                                  (role: Role) => role.id === relation.roleId
                                )[0]?.name || "",
                            };
                          });
                        })
                        .then(() => {
                          setCurrentUser({
                            ...currentUser,
                            persons: persons.sort((a, b) =>
                              a.name.localeCompare(b.name)
                            ),
                            roles: roles.sort((a, b) =>
                              a.name.localeCompare(b.name)
                            ),
                            relations: relations?.sort(
                              (a, b) =>
                                persons
                                  .find((person) => person.id === a.isPersonId)
                                  ?.name.localeCompare(
                                    persons.find(
                                      (person) => person.id === b.isPersonId
                                    )?.name || ""
                                  ) || 0
                            ),
                          });
                        });
                    }
                  });
                });
            }
          });
        });
    }
  });
}

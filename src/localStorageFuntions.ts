// Import compoments
import { getAllPerson, getAllRoles, getAllRelations } from "./dbFunctions";
import {
  Person,
  Role,
  Relation,
  CurrentUser,
  currentUserDefault,
} from "./types";

// To get the current user from local storage
function getLocalCurrentUser() {
  const localCurrentUser = localStorage.getItem("currentUser");
  return localCurrentUser
    ? (JSON.parse(localCurrentUser) as CurrentUser)
    : currentUserDefault;
}

// To update the current user in local storage
function updateLocalCurrentUser(user: CurrentUser) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// To clear the current user from local storage
function clearLocalCurrentUser() {
  localStorage.removeItem("currentUser");
}

// To sync the current user from local storage to the database
async function syncLocalCurrentUser(currentUser: CurrentUser) {
  const getAllPersonRes = getAllPerson(currentUser.id); // Get all persons
  const getAllrolesRes = getAllRoles(currentUser.id); // Get all roles
  const getAllRelationRes = getAllRelations(currentUser.id); // Get all relations
  let persons: Person[] = [];
  let roles: Role[] = [];
  let relations: Relation[] = [];
  let localCurrentUser = await getAllPersonRes.then((res) => {
    if (res.status === 200) {
      return res
        .json()
        .then((data) => {
          persons = data.dbData;
        })
        .then(() => {
          return getAllrolesRes.then((res) => {
            if (res.status === 200) {
              return res
                .json()
                .then((data) => {
                  roles = data.dbData;
                })
                .then(() => {
                  return getAllRelationRes.then((res) => {
                    if (res.status === 200) {
                      return res
                        .json()
                        .then((data) => {
                          relations = data.dbData?.map((relation: Relation) => {
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
                          return {
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
                          };
                        });
                    }
                  });
                });
            }
          });
        });
    }
  });

  // Sync the current user in local storage
  localStorage.setItem("currentUser", JSON.stringify(localCurrentUser));
  return {
    status: 200,
    msg: "Synced",
  };
}

export {
  getLocalCurrentUser,
  updateLocalCurrentUser,
  clearLocalCurrentUser,
  syncLocalCurrentUser,
};

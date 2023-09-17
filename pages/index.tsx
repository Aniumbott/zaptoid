"use client";

import { Person, Role, Relation, User } from "@/prisma/types";
// Import Modules
import { useSession } from "next-auth/react";
import { resolve } from "path";
import { useEffect, useState } from "react";

// Import Components
import Home from "./home/page";
import LogIn from "./login/page";
import { CurrentUser, currentUserDefault } from "@/prisma/types";
// Extra Functions

// Funciton to get user from database
async function getUser(user: User) {
  const res = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      action: "getUser",
      name: user.name,
      email: user.email,
    }),
  });
  return res;
}

// Function to create a person object of user
async function createPerson(person: User) {
  const res = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      action: "createUserPerson",
      name: person.name,
      email: [person.email],
      phone: [person.phone[0]] || [],
      id: person.id,
    }),
  });
  return res;
}

// Function to get all person
async function getAllPerson(userId: string) {
  const res = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      action: "getAllPersons",
      userId: userId,
    }),
  });
  return res;
}

// function to get all Roles
async function getAllRoles(userId: string) {
  const data = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      action: "getRoles",
      userId: userId,
    }),
  });
  return data;
}

// Function to get all the relations
async function getAllRelations(userId: string) {
  const data = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      action: "getRelations",
      isPersonId: "",
      ofPersonId: "",
      userId: userId,
    }),
  });
  return data;
}

// Export Module
export default function Main() {
  // States for all the dbData
  const [currentUser, setCurrentUser] =
    useState<CurrentUser>(currentUserDefault);

  const { data: session } = useSession() as any;

  // dbData API calls
  // First get/create the user
  useEffect(() => {
    if (session && session.user) {
      const getRes = getUser(session.user); // Update as well as creaate user
      getRes.then((res) => {
        if (res.status === 200) {
          res
            .json()
            .then(async (data) => {
              await createPerson(data.dbData); // Create person object of user
              return data;
            })
            .then((data) => {
              setCurrentUser({
                // Update user state
                ...currentUser,
                id: data.dbData.id,
                name: data.dbData.name,
                email: data.dbData.email,
                phone: data.dbData.phone,
                joined: data.dbData.joined,
              });
              return data;
            });
        }
      });
    }
  }, [session]);

  // Now collect his data
  useEffect(() => {
    if (currentUser.id) {
      // console.log(user);
      const getAllPersonRes = getAllPerson(currentUser.id);
      const getAllrolesRes = getAllRoles(currentUser.id);
      const getAllRelationRes = getAllRelations(currentUser.id);
      let persons: Person[] = [];
      let roles: Role[] = [];
      let relations: Relation[] = [];

      getAllPersonRes.then((res) => {
        if (res.status === 200) {
          res
            .json()
            .then((data) => {
              // console.log("persons", data);
              persons = data.dbData;
            })
            .then(() => {
              getAllrolesRes.then((res) => {
                if (res.status === 200) {
                  res
                    .json()
                    .then((data) => {
                      // console.log("roles", data);
                      roles = data.dbData;
                    })
                    .then(() => {
                      getAllRelationRes.then((res) => {
                        if (res.status === 200) {
                          res
                            .json()
                            .then((data) => {
                              // console.log("relations", data);
                              relations = data.dbData.map((relation: any) => {
                                return {
                                  ...relation,
                                  name:
                                    roles.filter(
                                      (role: Role) =>
                                        role.id === relation.roleId
                                    )[0].name || "",
                                };
                              });
                            })
                            .then(() => {
                              setCurrentUser({
                                ...currentUser,
                                persons: persons,
                                roles: roles,
                                relations: relations,
                              });
                            });
                        }
                      });
                      resolve();
                    });
                }
              });
              resolve();
            });
        }
        resolve();
      });
    }
  }, [currentUser.id]);

  // update local storage
  useEffect(() => {
    console.log(currentUser);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  if (session && session.user) {
    return <Home persons={currentUser.persons} />;
  }
  return <LogIn />;
}

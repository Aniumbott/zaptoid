import { User } from "./types";

// Function to create a person object of user
async function createPerson(person: User, isUser: boolean) {
  const res = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      action: "createPerson",
      isUser: isUser,
      id: person.id,
      name: person.name,
      email: [person.email],
      phone: [person.phone[0]] || [],
      userId: JSON.parse(localStorage.getItem("currentUser") || "{}").id || "",
    }),
  });
  return res;
}

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

// Update the person in the database
async function updatePerson(values: any) {
  const data = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      action: "updatePerson",
      userId: values.userId,
      id: values.id,
      name: values.name,
      phones: values.phones.map((phone: any) => phone.number) || [],
      emails: values.emails.map((email: any) => email.email) || [],
      description: values.description,
    }),
  });
  return data;
}

// Update the relations in the database
async function updateRelation(values: any) {
  const data = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      ...values,
      action: "updateRelations",
    }),
  });
  return data;
}

async function deletePerson(id: string) {
  const data = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      action: "deletePerson",
      id: id,
      userId: JSON.parse(localStorage.getItem("currentUser") || "{}").id || "",
    }),
  });
  return data;
}

export {
  createPerson,
  getUser,
  getAllPerson,
  getAllRoles,
  getAllRelations,
  updatePerson,
  updateRelation,
  deletePerson,
};

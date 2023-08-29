"use client";

// Import Modules
import { useSession } from "next-auth/react";
import { resolve } from "path";
import { useEffect, useState } from "react";

// Import Components
import Home from "./home/page";
import Auth from "./login/page";

// Extra Functions

// Funciton to get user from database
async function getUser(user: any) {
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
async function createPerson(person: any) {
  const res = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      action: "createUserPerson",
      name: person.name,
      email: [person.email],
      phone: [person.phone] || [],
      id: person.id,
    }),
  });
  return res;
}

// Function to get all the relations
const getAllRelations = async (userId: string) => {
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
};

// Function to get all person
async function getAllPerson(userId: any) {
  const res = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      action: "getAllPersons",
      userId: userId,
    }),
  });
  return res;
}

// Export Module
export default function Main() {
  // States for all the dbData
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: [],
    joined: new Date(),
  }); // User
  const [relations, setRelations] = useState([
    {
      id: "",
      name: "",
      isPersonId: "",
      ofPersonId: "",
      userId: "",
    },
  ]); // [Relation]
  const [persons, setPersons] = useState([
    {
      id: "",
      name: "",
      email: [],
      phone: [],
      description: "",
    },
  ]); // [Person]
  const { data: session, status } = useSession() as any;

  // Event listners
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
              setUser({
                // Update user state
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

  useEffect(() => {
    if (user.id) {
      // console.log(user);
      const getAllRes = getAllRelations(user.id);
      getAllRes // Get all the relations of the user
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              setRelations(data.dbData);
              console.log(relations);
            });
          }
          resolve();
        })
        .then(() => {
          const getAllper = getAllPerson(user.id);
          getAllper.then((res) => {
            // Get all the persons of the user
            if (res.status === 200) {
              res.json().then((data) => {
                if (data.dbData.length != 0) {
                  setPersons(data.dbData);
                  // console.log(persons);
                }
              });
            }
            resolve();
          });
        });
    }
  }, [user]);

  if (session && session.user) {
    return <Home persons={persons} relations={relations} />;
  }
  return <Auth />;
}

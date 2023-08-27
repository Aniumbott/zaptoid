"use client";

// Import Modules
import { useSession } from "next-auth/react";
import { resolve } from "path";
import { useEffect, useState } from "react";

// Import Components
import Home from "./home/page";
import Auth from "./login/page";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string[];
  joined: Date;
}

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

// Function to get all person
async function getAllPerson(id: any) {
  const res = await fetch(`/api/db`, {
    method: "POST",
    body: JSON.stringify({
      action: "getAllPersons",
      id: id,
    }),
  });
  return res;
}

// Export Module
export default function Main() {
  const [user, setUser] = useState({} as User);
  const [persons, setPersons] = useState([]); // [Person]
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
      const getAllRes = getAllPerson(user.id);
      getAllRes.then((res) => {
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
    }
  }, [user]);

  if (session && session.user) {
    return <Home user={user} persons={persons}/>;
  }
  return <Auth />;
}

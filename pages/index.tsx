"use client";

// Import Modules
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// Import Components
import Home from "./home/page";
import LogIn from "./login/page";
import { CurrentUser, currentUserDefault } from "@/src/types";
import { getUser, createPerson } from "../src/dbFunctions";
import {
  getLocalCurrentUser,
  syncLocalCurrentUser,
} from "../src/localStorageFuntions";

// Export Module
export default function Main() {
  // States for all the dbData
  const [currentUser, setCurrentUser] =
    useState<CurrentUser>(currentUserDefault);
  const [user, setUser] = useState({ id: "" } as any); // The session is updating twice, so we need to check if the user is the same to avoid twice calls.
  const { data: session } = useSession() as any;

  // Function collect the user data
  async function getUserData(user: any) {
    return await getUser(user).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          return data.dbData;
        });
      }
    });
  }

  // Function to collect the person data
  async function createUserPerson(user: any) {
    return await createPerson(
      {
        ...user,
        userId: user.id,
        phone: "0000000000",
      },
      true
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          return data.dbData;
        });
      }
    });
  }

  // Check if the user exist
  useEffect(() => {
    if (session && session.user && session.user.id !== user.id) {
      setUser(session.user);
    }
  }, [session]);

  // Check if the user is logged in
  useEffect(() => {
    if (user.id !== "") {
      getUserData(session.user)
        .then((data: any) => {
          // Collect user data from db
          if (data.personId === null) {
            // If the user has no user-person
            createUserPerson(data).then((data: any) => {
              // Create a user-person
              getUserData({ ...session.user, personId: data.id }) // Update the personId in of the user
                .then((data: any) => {
                  setCurrentUser({ ...currentUser, ...data });
                });
            });
          }
          return data;
        })
        .then((data: any) => {
          setCurrentUser({ ...currentUser, ...data });
        });
    }
  }, [user]);

  // Now collect his data
  useEffect(() => {
    if (currentUser.id) {
      syncLocalCurrentUser(currentUser).then(() => {
        setCurrentUser(getLocalCurrentUser());
      });
    }
  }, [currentUser.id]);

  if (session && session.user) {
    return <Home persons={currentUser.persons} />;
  }
  return <LogIn />;
}

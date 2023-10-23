"use client";

// Import Modules
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// Import Components
import Home from "./home/page";
import LogIn from "./login/page";
import { CurrentUser, currentUserDefault } from "@/src/types";
import getCurrentUser from "../src/getCurrentUser";
import { getUser, createPerson } from "../src/dbFunctions";

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
              await createPerson(data.dbData, true); // Create person object of user
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
      getCurrentUser({ currentUser, setCurrentUser }); // Collect user data from db
    }
  }, [currentUser.id]);

  // update local storage
  useEffect(() => {
    // console.log("currenUser", currentUser);
    if (currentUser.id) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  if (session && session.user) {
    return <Home persons={currentUser.persons} />;
  }
  return <LogIn />;
}

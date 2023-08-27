"use client";
// Import Modules
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Import Components
import NavBar from "../components/NavBar";
import Contacts from "../components/Contacts";
import Person from "../components/Person";

export default function Home(props: any) {
  const { user, persons } = props;
  const router = useRouter();
  const [person, setPerson] = useState({} as any);

  useEffect(() => {
    if (router.query.personId) {
      setPerson(
        persons.filter((person: any) => person.id === router.query.personId)[0]
      );
    }
  }, [router.query.personId]);

  return (
    <>
      <NavBar />
      {person.id && router.query.personId ? (
        <Person userId={user.id} person={person} />
      ) : (
        <Contacts userId={user.id} persons={persons} />
      )}
    </>
  );
}

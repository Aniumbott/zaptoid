"use client";
// Import Modules
import { useRouter } from "next/router";

// Import Components
import NavBar from "../components/NavBar";
import Contacts from "../components/Contacts";
import Person from "../components/Person";

export default function Home(props: any) {
  const { persons, relations } = props;
  const router = useRouter();

  return (
    <>
      <NavBar />
      {router.query.personId ? (
        <Person persons={persons} relations={relations}/>
      ) : (
        <Contacts persons={persons} />
      )}
    </>
  );
}

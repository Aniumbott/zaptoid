"use client";
// Import Modules
import { useRouter } from "next/router";

// Import Components
import NavBar from "../components/NavBar";
import Contacts from "../components/Contacts";
import PersonProfile from "../components/PersonProfile";
import { Relation, Person } from "@/prisma/dbTypes";

export default function Home(props: {persons:Person[], relations:Relation[]}) {
  const { persons, relations } = props;
  const router = useRouter();

  return (
    <>
      <NavBar />
      {router.query.personId ? (
        <PersonProfile persons={persons} relations={relations}/>
      ) : (
        <Contacts persons={persons} />
      )}
    </>
  );
}

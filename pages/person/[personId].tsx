"use client";
// Import Modules
import { useRouter } from "next/router";
import { Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

// Import Components
import { Person, Relation } from "@/prisma/dbTypes";
import wallpaper from "../../public/profile-bg.svg";
import SectionLeft from "./SectionLeft";
import SectionRight from "./SectionRight";
import NavBar from "../components/NavBar";

// Export Module
export default function Page() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [relations, setRelations] = useState<Relation[]>([]);

  useEffect(() => {
    // Fetch all the persons and update the state
    const getPersons = JSON.parse(localStorage.getItem("persons") || "");
    const getRelations = JSON.parse(localStorage.getItem("relations") || "");
    setPersons(getPersons);
    setRelations(getRelations);
  }, []);

  const [person, setPerson] = useState({
    id: "",
    name: "",
    email: [""],
    phone: [""],
    description: "",
    userId: "",
  } as Person);

  const [editable, setEditable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // gather all the persons and relations from localStorage
    // console.log(persons);
    if (router.query.personId) {
      const getPerson = persons.filter(
        (person: Person) => person.id == router.query.personId
      )[0];

      if (getPerson) {
        setPerson(getPerson);
      }
      // console.log("person", getPerson);
    }
  }, [router.query.personId, persons]);

  return (
    <>
      <Head>
        <title>{person.name} | Zaptoid</title>
      </Head>
      <NavBar />
      <div className="container">
        <div className="wallpaper">
          <Image src={wallpaper} alt="wallpaper" />
        </div>
        <div className="person">
          <div className="person-details">
            <SectionLeft person={person} editable={editable} />
            <Divider orientation="vertical" />
            <SectionRight
              person={person}
              persons={persons}
              relations={relations}
              editable={editable}
              setEditable={setEditable}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          left: 0;
          width: calc(100% - 5rem);
          height: 100vh;
          margin-left: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .wallpaper {
          width: 100%;
          height: 10rem;
          overflow: hidden;
        }
        .person {
          position: relative;
          height: 100%;
          width: 100%;
        }
        .person-details {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </>
  );
}

"use client";
// Import Modules
import { useRouter } from "next/router";
import { Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useForm } from "@mantine/form";

// Import Components
import {
  CurrentUser,
  currentUserDefault,
  Person,
  personDefault,
  Relation,
} from "@/prisma/types";
import wallpaper from "../../public/profile-bg.svg";
import SectionLeft from "./SectionLeft";
import SectionRight from "./SectionRight";
import NavBar from "../components/NavBar";

// Export Module
export default function Page() {
  const [currentUser, setCurrentUser] =
    useState<CurrentUser>(currentUserDefault);
  const [person, setPerson] = useState<Person>(personDefault);
  const [editable, setEditable] = useState(false);
  const router = useRouter();

  // Form object
  const form = useForm({
    initialValues: {
      name: "",
      phones: [{ number: "9999999999" }],
      emails: [{ email: "xyz@gmail.com" }],
      description: "",
      relationsD: [{ roleId: "xyz", ofPersonId: "2" }],
      relationsI: [{ roleId: "xyz", isPersonId: "2" }],
    },
    validate: {
      name: (value) => (value.trim().length >= 3 ? null : "Name is too short"), // Name should be atleast 3 characters long
      phones: {
        number: (value: String) =>
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
            // Regex for phone number
            `${value}`
          )
            ? null
            : "Invalid Phone",
      },
      emails: {
        email: (value: String) =>
          /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(`${value}`) // Regex for email
            ? null
            : "Invalid Email",
      },
      relationsD: {
        roleId: (value: String) => (value ? null : "Select a Role"),
        ofPersonId: (value: String) => (value ? null : "Select a Person"), // At least one person should be selected
      },
      relationsI: {
        roleId: (value: String) => (value ? null : "Select a Role"),
        isPersonId: (value: String) => (value ? null : "Select a Person"), // At least one person should be selected
      },
    },
  });

  // Event Handlers
  // Fetch all the persons and update the state
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setCurrentUser(JSON.parse(currentUser));
    }
  }, []);

  // Gather all the persons and relations from localStorage
  useEffect(() => {
    // console.log(persons);
    if (router.query.personId) {
      const getPerson = currentUser.persons.filter(
        (p: Person) => p.id == router.query.personId
      )[0];

      if (getPerson) {
        setPerson(getPerson);
      }
      // console.log("person", getPerson);
    }
  }, [router.query.personId, currentUser]);

  // Update the form values when person is updated
  useEffect(() => {
    form.setValues({
      name: person.name,
      phones: [
        ...person.phone.map((phone: String) => ({
          number: phone.toString(),
        })),
      ],
      emails: [
        ...person.email.map((email: String) => ({ email: email.toString() })),
      ],
      description: person.description,
      relationsD:
        currentUser.relations
          .filter(
            (relation: Relation) =>
              relation.isPersonId === router.query.personId
          )
          .map(
            (relation: Relation) =>
              ({
                roleId: relation.roleId,
                ofPersonId: relation.ofPersonId,
              } as Relation)
          ) || form.values.relationsD,
      relationsI:
        currentUser.relations
          .filter(
            (relation: Relation) =>
              relation.ofPersonId === router.query.personId
          )
          .map(
            (relation: Relation) =>
              ({
                roleId: relation.roleId,
                isPersonId: relation.isPersonId,
              } as Relation)
          ) || form.values.relationsI,
    });
  }, [person, editable]);

  // useEffect(() => {
  //   console.log(form.values);
  //   console.log(form.errors);
  // }, [form.values]);

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
          <form
            onSubmit={form.onSubmit((values) => {
              console.log(values);
            })}
          >
            <div className="person-details">
              <SectionLeft person={person} editable={editable} form={form} />
              <Divider orientation="vertical" />
              <SectionRight
                person={person}
                currentUser={currentUser}
                editable={editable}
                setEditable={setEditable}
                form={form}
              />
            </div>
          </form>
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

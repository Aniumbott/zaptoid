"use client";
// Import Modules
import { useRouter } from "next/router";
import { Divider, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

// Import Components
import {
  CurrentUser,
  currentUserDefault,
  Person,
  personDefault,
  Relation,
} from "@/src/types";
import wallpaper from "../../public/profile-bg.svg";
import SectionLeft from "./SectionLeft";
import SectionRight from "./SectionRight";
import NavBar from "../components/NavBar";
import { updatePerson, updateRelation } from "../../src/dbFunctions";
import style from "./person.module.css";
import {
  getLocalCurrentUser,
  syncLocalCurrentUser,
} from "@/src/localStorageFuntions";

// Export Module
export default function Page() {
  const [currentUser, setCurrentUser] =
    useState<CurrentUser>(currentUserDefault);
  const [person, setPerson] = useState<Person>(personDefault);
  const [editable, setEditable] = useState(false);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  // Form object
  const form = useForm({
    initialValues: {
      name: "",
      phones: [{ number: "9999999999" }],
      emails: [{ email: "newperson@zaptoid.mail" }],
      description: "Nothing to show here",
      relationsD: [{ roleId: "420", ofPersonId: "387" }],
      relationsI: [{ roleId: "512", isPersonId: "974" }],
    },
    validate: {
      name: (value) => (value.trim().length >= 3 ? null : "Name is too short"), // Name should be atleast 3 characters long
      phones: {
        number: (value: String) =>
          // Check if the number already assigned to someone else
          !isPhonePresent(value)
            ? /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
                // Regex for phone number
                `${value}`
              )
              ? null
              : "Invalid Phone"
            : "Phone number already assigned to someone else",
      },
      emails: {
        email: (value: String) =>
          //Chec if the email is already assigned to someone else
          !isEmailPresent(value)
            ? /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
                `${value}`
              ) // Regex for email
              ? null
              : "Invalid Email"
            : "This email is already assigned to someone else",
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

  // Functions
  // To check if the phone number is already present
  function isPhonePresent(phone: String) {
    return (
      currentUser.persons
        ?.filter((person: Person) => person.id !== router.query.personId)
        .some((person: Person) => person.phone.includes(String(phone))) || false
    );
  }

  // To chck if the email is already present
  function isEmailPresent(email: String) {
    return (
      currentUser.persons
        ?.filter((person: Person) => person.id !== router.query.personId)
        .some((person: Person) => person.email.includes(String(email))) || false
    );
  }

  // Update the form values in the database
  async function updateFormValues(values: any) {
    try {
      let data = await updatePerson(values); // First update the person
      let dbData =
        data.status === 200
          ? await data.json().then((data) => data.dbData)
          : null;

      if (dbData) {
        const oldRelations =
          currentUser.relations?.filter(
            (relation: Relation) =>
              relation.ofPersonId === dbData.id ||
              relation.isPersonId === dbData.id
          ) || [];

        // Filter out the relations that are already present
        const addable = values.relationsD // Relations to be added
          .filter(
            (relation: Relation) =>
              !oldRelations.some(
                (oldRelation: Relation) =>
                  oldRelation.ofPersonId === relation.ofPersonId &&
                  oldRelation.roleId === relation.roleId
              )
          )
          .map((relation: Relation) => ({ ...relation, isPersonId: dbData.id }))
          .concat(
            values.relationsI
              .filter(
                (relation: Relation) =>
                  !oldRelations.some(
                    (oldRelation: Relation) =>
                      oldRelation.isPersonId === relation.isPersonId &&
                      oldRelation.roleId === relation.roleId
                  )
              )
              .map((relation: Relation) => ({
                ...relation,
                ofPersonId: dbData.id,
              }))
          );

        const deletable = oldRelations.filter((relation: Relation) => {
          // Relations to be deleted
          if (relation.ofPersonId !== dbData.id) {
            return !values.relationsD.some(
              (newRelation: Relation) =>
                newRelation.ofPersonId === relation.ofPersonId &&
                newRelation.roleId === relation.roleId
            );
          } else {
            return !values.relationsI.some(
              (newRelation: Relation) =>
                newRelation.isPersonId === relation.isPersonId &&
                newRelation.roleId === relation.roleId
            );
          }
        });

        // Conseutive API calls
        Promise.all(
          addable?.map((relation: Relation) =>
            updateRelation({ task: "add", ...relation, userId: currentUser.id })
          )
        ).then(() => {
          Promise.all(
            deletable?.map((relation: Relation) =>
              updateRelation({ task: "delete", ...relation })
            )
          ).then(() => {
            syncLocalCurrentUser(currentUser).then(() => {
              setCurrentUser(getLocalCurrentUser());
              setPerson(dbData);
              setEditable(false);
              setUpdating(false);
            });
          });
        });
      }

      return data;
    } catch (err: any) {
      setUpdating(false);
      alert(err.message);
    }
  }

  // Event Handlers
  // Update the currentUser state
  useEffect(() => {
    if (router.query.personId) {
      setCurrentUser(getLocalCurrentUser());
    }
  }, [router.query.personId]);

  // Update the person state
  useEffect(() => {
    if (router.query.personId) {
      const getPerson = currentUser.persons.filter(
        (p: Person) => p.id == router.query.personId
      )[0];

      if (getPerson) {
        setPerson(getPerson);
      }
    }
  }, [currentUser]);

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
          ?.filter(
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
          ?.filter(
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

  useEffect(() => {
    if (updating) {
      notifications.show({
        loading: true,
        message: "Saving the changes...",
        autoClose: false,
        withCloseButton: false,
        id: "updating",
        withBorder: true,
      });
    } else {
      notifications.update({
        id: "updating",
        color: "teal",
        message: "Changes saved.",
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 3000,
        withBorder: true,
      });
    }
  }, [updating]);

  return (
    <>
      <Head>
        <title>{person.name} | Zaptoid</title>
      </Head>
      <NavBar active={-1} />
      <div className={style.container}>
        <div className={style.wallpaper}>
          <Image src={wallpaper} alt="wallpaper" />
        </div>
        <div className={style.person}>
          <form
            onSubmit={form.onSubmit((values) => {
              // console.log(values);
              setUpdating(true);
              updateFormValues({
                ...values,
                id: person.id,
                userId: currentUser.id,
              });
            })}
          >
            <div className={style.personDetails}>
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
    </>
  );
}

// import Modules
import { useRouter } from "next/router";
import {
  Avatar,
  Card,
  Divider,
  Title,
  Text,
  Button,
  ActionIcon,
} from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconPhone,
  IconBrandWhatsapp,
  IconMail,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Person, Relation } from "@/prisma/dbTypes";

// Import Components
import RelationTabs from "./RelationTabs";
import wallpaper from "../../public/profile-bg.svg";

// Custom Types
type color = "blue" | "red" | "green" | "yellow" | "gray";

// Export Module
export default function PersonProfile(props: {persons:Person[], relations:Relation[]}) {
  const { persons, relations } = props;
  const [person, setPerson] = useState({
    id: "",
    name: "",
    email: [""],
    phone: [],
    description: "",
    userId: "",
  } as Person);
  const router = useRouter();

  useEffect(() => {
    // Set the curent person state and fetch all the relations of the person and update the state
    if (router.query.personId) {
      setPerson(
        persons.filter((person: Person) => person.id === router.query.personId)[0]
      );
    }
  }, [router.query.personId]);

  return (
    <>
      {/* <p>Post: {router.query.id}</p> */}
      <div className="container">
        <div className="wallpaper">
          <Image src={wallpaper} alt="wallpaper" />
        </div>
        <div className="person">
          <div className="person-details">
            <div className="section-left">
              <div className="person-image">
                <Avatar
                  size={150}
                  radius={150}
                  variant="filled"
                  color={
                    person.name.split(" ").length > 1
                      ? (person.name.split(" ")[1][0].toLowerCase() as color)
                      : "blue"
                  }
                >
                  {person.name.split(" ").map((n: string) => n[0])}
                </Avatar>
              </div>
              <Card
                style={{ width: "100%", height: "100%", paddingTop: "90px" }}
              >
                <Title order={2}> {person.name}</Title>
                <Text c="dimmed">
                  {person.phone[0] ? Number(person.phone[0]) : "(none)"}
                </Text>
                <Text c="dimmed">{person.email[0]}</Text>

                <div className="person-actions">
                  <Link href={`tel:${person.phone[0]}`} target="_blank">
                    <ActionIcon
                      style={{ margin: "0 0.25rem" }}
                      color="primary"
                      radius="sm"
                      variant="light"
                    >
                      <IconPhone />{" "}
                    </ActionIcon>
                  </Link>
                  <Link
                    href={`https://wa.me/${person.phone[0]}`}
                    target="_blank"
                  >
                    <ActionIcon
                      style={{ margin: "0 0.25rem" }}
                      color="primary"
                      radius="sm"
                      variant="light"
                    >
                      <IconBrandWhatsapp />{" "}
                    </ActionIcon>
                  </Link>
                  <Link href={`mailto:${person.email[0]}`} target="_blank">
                    <ActionIcon
                      style={{ margin: "0 0.25rem" }}
                      color="primary"
                      radius="sm"
                      variant="light"
                    >
                      <IconMail />{" "}
                    </ActionIcon>
                  </Link>
                </div>

                <Button
                  variant="subtle"
                  radius="xl"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    margin: "1rem",
                  }}
                  onClick={() => router.back()}
                >
                  <IconArrowNarrowLeft />
                  Back
                </Button>
              </Card>
            </div>
            <Divider orientation="vertical" />
            <div className="section-right">
              <Card style={{ width: "100%", height: "100%" }}>
                <div className="description-container">
                  <Title order={2}>Description</Title>
                  <Text> {person.description}</Text>
                </div>
                <div className="relations-container">
                  <Title order={2}>Relations</Title>
                  <div className="relation-tabs">
                    <RelationTabs
                      relationsD={relations ? relations.filter(
                        (relation: Relation) => relation.isPersonId === person.id
                      ): []}
                      relationsI={relations ? relations.filter(
                        (relation: Relation) => relation.ofPersonId === person.id
                      ): []}
                      persons={persons}
                    />
                  </div>
                </div>
              </Card>
            </div>
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
        .person-image {
          position: absolute;
          top: -75px;
          left: 100px;
          z-index: 1;
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
        .section-left,
        .section-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 30rem;
          height: 100%;
          padding: 1.5rem;
        }
        .section-right {
          width: 100%;
        }
        .person-actions {
          display: flex;
          flex-direction: row;
          justify-content: left;
          align-items: center;
          width: 100%;
          margin-top: 1rem;
        }
        .description-container,
        .relations-container {
          margin-bottom: 1rem;
        }
        .relation-tabs {
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
}

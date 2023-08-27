// import Modules
import { useRouter } from "next/router";
import { Avatar, Card, Divider, Title, Text, Button } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Image from "next/image";

// Import Components
import RelationTabs from "./RelationTabs";
import wallpaper from "../../public/profile-bg.svg";

// Custom Types
type color = "blue" | "red" | "green" | "yellow" | "gray";

// Export Module
export default function Person(props: any) {
  const { userId, person } = props;
  const [relations, setRelations] = useState([] as any);
  
  // Function to fetch the relations
  const getRelations = async () => {
    const data = await fetch(`/api/db`, {
      method: "POST",
      body: JSON.stringify({
        action: "getRelations",
        isPersonId: "",
        ofPersonId: "",
        userId: userId,
      }),
    });
    return data;
  };

  useEffect(() => { // Fetch all the relations of the person and update the state
    getRelations().then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setRelations(data.dbData);
          console.log(data.dbData);
        });
      }
    });
  }, [person]);

  const router = useRouter();
  return (
    <>
      {/* <p>Post: {router.query.id}</p> */}
      <div className="container">
        <div className="wallpaper">
          <Image src={wallpaper} alt="wallpaper" />
          {/* <Image src={wallpaper} alt="wallpaper" style={{ width: "50%" }} /> */}
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
                  {person.phone[0] ? person.phone[0] : "(none)"}
                </Text>
                <Text c="dimmed">{person.email[0]}</Text>

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
                      relationsD={relations.filter(
                        (relation: any) => relation.isPersonId === person.id
                      )}
                      relationsI={relations.filter(
                        (relation: any) => relation.ofPersonId === person.id
                      )}
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

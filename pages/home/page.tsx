// Import Modules
import { useRouter } from "next/router";
import { Title } from "@mantine/core";
import Head from "next/head";

// Import Components
import NavBar from "../components/NavBar";
import PersonCard from "./PersonCard";
import { Person } from "@/src/types";
import PersonCardSkeleton from "./PersonCardSkeleton";
import styles from "./home.module.css";

// Export Module
export default function Home(props: { persons: Person[] }) {
  const { persons } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Zaptoid</title>
      </Head>
      <NavBar active={0} />
      <div className={styles.homeContainer}>
        <Title style={{ position: "fixed", zIndex: 1000 }} order={1}>
          Contacts
        </Title>
        <div className={styles.cardsContainer}>
          {persons && persons.length > 1
            ? persons.map((person: Person) => {
                if (person.name !== "you") {
                  return (
                    <div
                      className={styles.card}
                      key={person.id}
                      onClick={() => {
                        router.push(`/person/${person.id}`);
                      }}
                    >
                      {/* small person-card */}
                      <PersonCard person={person} />
                    </div>
                  );
                }
              })
            : Array.from(Array(25).keys()).map((i) => {
                return (
                  <div className={styles.card} key={i}>
                    <PersonCardSkeleton key={i} />
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
}

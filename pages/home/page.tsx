// Import Modules
import { useRouter } from "next/router";
import { Title } from "@mantine/core";
import Head from "next/head";

// Import Components
import NavBar from "../components/NavBar";
import PersonCard from "./PersonCard";
import { Person } from "@/prisma/types";
import PersonCardSkeleton from "./PersonCardSkeleton";

// Export Module
export default function Contacts(props: { persons: Person[] }) {
  const { persons } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Zaptoid</title>
      </Head>
      <NavBar />
      <div className="home-containeer">
        <Title order={1}>Contacts</Title>
        <div className="cards-conatiner">
          {persons && persons.length > 1
            ? persons.map((person: Person) => (
                <div
                  className="card"
                  key={person.id}
                  onClick={() => {
                    router.push(`/person/${person.id}`);
                  }}
                >
                  {/* small person-card */}
                  <PersonCard person={person} />
                </div>
              ))
            : // <div className="card">
              Array.from(Array(25).keys()).map((i) => {
                return (
                  <div className="card" key={i}>
                    <PersonCardSkeleton key={i} />
                  </div>
                );
              })}
        </div>
      </div>
      <style jsx>{`
        .home-containeer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          margin-left: 5rem;
          padding: 1rem;
        }
        .cards-conatiner {
          max-width: calc(100% - 2rem);
          display: flex;
          flex-wrap: wrap;
          justify-content: left;
          align-items: center;
        }
        .card {
          margin: 0.5rem;
          cursor: pointer;
        }
        .loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
}

"use client";
// Import Modules
import { Title } from "@mantine/core";
import { useEffect } from "react";

// Import Components
import NavBar from "../components/NavBar";

export default function Home(props: any) {
  const { user, persons } = props;

  return (
    <>
      <NavBar />
      <div className="home-containeer">
        <Title order={1}>Home</Title>
        <div className="cards-conatiner">
          {persons.map((person: any) => (
            <div className="card" key={person.id}>
              <h3>{person.name}</h3>
              <p>{person.email}</p>
              <p>{person.phone}</p>
            </div>
          ))}
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
      `}</style>
    </>
  );
}

"use client";
import NavBar from "../components/NavBar";
import ThemeToggle from "../components/ThemeToggle";

type Person = {
  name: string;
  email: string;
} | null;

export default function Home() {
  return (
    <>
      <NavBar />
      <ThemeToggle />
    </>
  );
}

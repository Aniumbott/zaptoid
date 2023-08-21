"use client";

// Import Modules
import { useSession } from "next-auth/react";
import { useEffect } from "react";

// Import Components
import Home from "./Home/page";
import Auth from "./Login/page";

async function updateUser(user: any) {
  const res = await fetch(`/api/db/getUsers`, {
    method: "POST",
    body: JSON.stringify({
      action: "updateUser",
      name: user.name,
      email: user.email,
    }),
  });
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default function Main() {
  const { data: session, status } = useSession() as any;

  useEffect(() => {
    if (session && session.user) {
      const users = updateUser(session.user);
    }
  }, [session]);

  if (session && session.user) {
    return <Home />;
  }
  return <Auth />;
}

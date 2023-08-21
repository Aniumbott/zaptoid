"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@mantine/core";

const SignInButton = () => {
  const { data: session, status } = useSession() as any;

  if (session && session.user) {
    return (
      <div>
        <p>name: {session.user.name}</p>
        <p>email: {session.user.email}</p>
        <Button
        color="red"
          onClick={() => {
            signOut();
          }}>Click to singn out</Button>
      </div>
    );
  }
  return (
    <Button
      onClick={() => {
        signIn("google");
      }}
    >
      sign in with google
    </Button>
  );
};



export default SignInButton;

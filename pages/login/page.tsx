"use client";
// Import Modules
import Image from "next/image";
import { Button } from "@mantine/core";
import { Card } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import Head from "next/head";

// Import Components
import logo from "../../public/zaptoid.svg";
import style from "./login.module.css";
// Export Module
export default function Page() {
  return (
    <>
      <Head>
        <title>Log In | Zaptoid</title>
      </Head>
      <div className={style.signIn}>
        <div className={style.signInBox}>
          <Card shadow="sm" withBorder>
            <Card.Section className={style.signInLogo}>
              <Image src={logo} id="logo" alt="logo" height={300} width={300} />
            </Card.Section>

            <Text
              align="justify"
              size="lg"
              color="dimmed"
              className={style.signInText}
            >
              <b>Zaptoid</b> helps you to utilize your personal network to the fullest by keeping more precise details than a classic <b>Contacts</b> app.
            </Text>

            <Button
              leftIcon={<IconBrandGoogle size={18} />}
              variant="filled"
              onClick={() => {
                signIn("google");
              }}
              fullWidth
              size="lg"
              className={style.signInButton}
            >
              Sign In with Google
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}

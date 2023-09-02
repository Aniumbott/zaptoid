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

// Export Module
function Login() {
  return (
    <>
      <Head>
        <title>Log In | Zaptoid</title>
      </Head>
      <div className="sign-in">
        <div className="sign-in-box">
          <Card shadow="sm" withBorder>
            <Card.Section className="sign-in-logo">
              <Image src={logo} id="logo" alt="logo" height={300} width={300} />
            </Card.Section>

            <Text
              align="justify"
              size="lg"
              color="dimmed"
              className="sign-in-text"
            >
              It might happen that you just can't remember <b>"THAT GUY"</b> ?
              Introducing <b>Zaptoid</b> a better version of old that classic
              contacts app which help you to manage your network of people with
              relation based system.
            </Text>

            <Button
              leftIcon={<IconBrandGoogle size={18} />}
              variant="filled"
              onClick={() => {
                signIn("google");
              }}
              fullWidth
              size="lg"
              className="sign-in-button"
            >
              Sign In with Google
            </Button>
          </Card>
        </div>
        <style>
          {`
        body{
          background-color: #000;
        }
        .sign-in{
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .sign-in-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 25rem;
            transition: all 0.2s ease-in-out;
            overflow: hidden;
            border-radius: 0.5rem;
        }
        .sign-in-box:hover {
            box-shadow: 0px 0px 0px 10px #BC8CF266;
          }
        
        .sign-in-button {
          margin-top: 1rem;
        }
        
        .sign-in-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 20rem;
          width: 100%;
			margin:0;
        }
        
		#logo{
			object-fit: cover;	
		}
		
        .sign-in-text{
          padding: 1rem 0rem;
        }


            `}
        </style>
      </div>
    </>
  );
}

export default Login;

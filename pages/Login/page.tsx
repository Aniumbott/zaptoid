"use client";
// Import Modules
import Image from "next/image";
import { Button } from "@mantine/core";
import { Card } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

// Import Components
import logo from "../../public/rolodex.jpg";

type User = {
  name: string;
  email: string;
} | null;

// Main function
function Login() {

  return (
    <div className="sign-in">
      <div className="sign-in-box">
        <Card shadow="sm" withBorder>
          <Card.Section className="sign-in-logo">
            <Image
              src={logo}
              id="logo"
              alt="Next-Todo-Logo"
              height={300}
              width={300}
            />
          </Card.Section>

          <Text
            align="justify"
            size="lg"
            color="dimmed"
            className="sign-in-text"
          >
            Don't know who is who and just can't remember <b>THAT GUY</b> ? Use{" "}
            <b>Rolodexon</b> to manage your network of people with relation
            based system.
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
            box-shadow: 0px 0px 0px 10px #6741d966;
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
			border-radius: 50%;
			object-fit: cover;	
		}
		
        .sign-in-text{
          padding: 1rem 0rem;
        }


            `}
      </style>
    </div>
  );
}

export default Login;

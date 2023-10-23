// Import Modules
"use client";
import { useEffect, useState } from "react";
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import Link from "next/link";
import {
  IconHome2,
  IconPlus,
  IconSettings,
  IconLogout,
  IconCheck,
  // IconBrandGraphql,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import logo from "../../public/zaptoid.svg";
import { createPerson } from "../../src/dbFunctions";
import { User } from "@/src/types";
import { notifications } from "@mantine/notifications";

// Styles
const useStyles = createStyles((theme) => ({
  link: {
    width: rem(40),
    height: rem(40),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,
    margin: "10px 0",
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "default", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
    "@media (max-width: 768px)": {
      margin: "0",
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.15
      ),
    },
  },
}));

interface NavbarLinkProps {
  //Type for NavbarLinkProps
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  //Single NavbarLink Component
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

// Export Component
export default function NavBar(props: { active: number }) {
  const [active, setActive] = useState(props.active);
  const router = useRouter();

  useEffect(() => {
    console.log(active);
  }, [active]);

  return (
    <Navbar
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({
          variant: "default",
          color: theme.primaryColor,
        }).background,
      })}
      className="navbar"
    >
      {/* Zaptoid Logo */}
      <Link href="/" className="image-container">
        <Tooltip
          label="Zaptoid"
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <Image
            src={logo}
            alt="Zaptoid Logo"
            id="logo"
            height={40}
            className="image"
          />
        </Tooltip>
      </Link>

      {/* Links */}
      <Navbar.Section grow className="links-container">
        <NavbarLink
          icon={IconHome2}
          label="Home"
          key="Home"
          active={0 === active}
          onClick={() => {
            setActive(0);
            router.push("/");
          }}
        />
        <NavbarLink
          icon={IconPlus}
          label="Add Person"
          key="Add Person"
          onClick={() => {
            notifications.show({
              loading: true,
              message: "Creating new person",
              autoClose: false,
              withCloseButton: false,
              id: "loading",
              withBorder: true,
            });

            const getNewUser = createPerson(
              {
                id: "NA",
                name: "Zaptoid Person",
                email: "",
                phone: [""],
                joined: new Date(),
              } as User,
              false
            );
            getNewUser.then((res) => {
              if (res.status === 200) {
                res.json().then((data) => {
                  notifications.update({
                    id: "loading",
                    color: "teal",
                    message: "New person created.",
                    icon: (
                      <IconCheck style={{ width: rem(18), height: rem(18) }} />
                    ),
                    loading: false,
                    autoClose: 3000,
                    withBorder: true,
                  });
                  const currentUser = JSON.parse(
                    localStorage.getItem("currentUser") || ""
                  );
                  localStorage.setItem(
                    "currentUser",
                    JSON.stringify({
                      ...currentUser,
                      persons: [...currentUser.persons, data.dbData],
                    })
                  );
                  router.push(`/person/${data.dbData.id}`);
                });
              }
            });
          }}
        />
        <NavbarLink
          icon={IconSettings}
          label="Settings"
          key="Settings"
          active={1 === active}
          onClick={() => {
            setActive(1);
            router.push("/settings");
          }}
        />
      </Navbar.Section>

      {/* LogOut Button */}
      <Navbar.Section>
        <NavbarLink
          icon={IconLogout}
          onClick={() => {
            router.replace("/").then(() => {
              signOut();
            });
          }}
          label="Logout"
        />
      </Navbar.Section>
      <style>
        {`
          .navbar{
            display: flex;
            flex-direction: column;
            position: fixed;
            width: 70px;
            left: 0;
          }

            #logo {
            height: 40px; 
            }

            .links-container{
              display: flex;
              flex-direction: column;
              margin-top: 30px;
            }

            .image-container{
              widht: 40px;
            }

            @media (max-width: 768px) {
              .navbar{
                padding-left:30px;
                padding-right:30px;
                flex-direction: row;
                width: 100%;
                height: 70px;
                bottom: 0;
                left: 0;
                z-index: 100;
              }
              .links-container{
                flex-direction: row;
                justify-content: space-evenly;
                width: 100%;
                margin: 0;
              }

            }
          `}
      </style>
    </Navbar>
  );
}

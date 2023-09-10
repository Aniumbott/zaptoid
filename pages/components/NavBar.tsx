// Import Modules
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
} from "@mantine/core";
import {
  IconHome2,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";

import { signOut } from "next-auth/react";
import logo from "../../public/zaptoid.svg";

// Styles
const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,

    "&:hover": {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "default", color: theme.primaryColor })
          .background!,
        0.1
      ),
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

const mockdata = [
  //Mockdata for NavbarLink
  { icon: IconHome2, label: "Home", link: "/" },
  { icon: IconUser, label: "Account", link: "/account" },
  { icon: IconSettings, label: "Settings", link: "/settings" },
];

// Export Component
export default function NavBar() {
  const [active, setActive] = useState(0);
  const { data: session, status } = useSession() as any;
  const router = useRouter();
  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        router.push(`${link.link}`);
      }}
    />
  ));

  useEffect(() => {
    console.log(active);
  }, [active]);

  return (
    <Navbar
      width={{ base: 80 }}
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({
          variant: "default",
          color: theme.primaryColor,
        }).background,
      })}
      className="navbar"
    >
      <Center>
        <Tooltip
          label="Zaptoid"
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <Image src={logo} alt="Zaptoid Logo" id="logo" />
        </Tooltip>
        <style>
          {`
          .navbar{
            position: fixed;
            top: 0;
            left: 0;
          }
            #logo {
            height: 3.125rem;
          `}
        </style>

      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconLogout}
            onClick={() => {
              router.replace("/").then(() => {
                signOut();
              });
            }}
            label="Logout"
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

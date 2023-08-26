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
import { Avatar } from "@mantine/core";
import Image from "next/image";

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
  { icon: IconHome2, label: "Home" },
  { icon: IconUser, label: "Account" },
  { icon: IconSettings, label: "Settings" },
];

// Export Component
export default function NavBar() {
  const [active, setActive] = useState(0);
  const { data: session, status } = useSession() as any;
  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
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
            #logo {
            height: 3.125rem;
          `}
        </style>

        {/* <Avatar src={session.user.image} alt="Zaptoid" radius="xl" /> */}
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
              signOut();
            }}
            label="Logout"
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

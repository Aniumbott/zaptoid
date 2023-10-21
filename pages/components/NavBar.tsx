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
  IconUser,
  IconSettings,
  IconLogout,
  // IconBrandGraphql,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import logo from "../../public/zaptoid.svg";

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

const mockdata = [
  //Mockdata for NavbarLink
  { icon: IconHome2, label: "Home", link: "/" },
  // { icon: IconBrandGraphql, label: "Visualizer", link: "/visualizer" },
  { icon: IconUser, label: "Account", link: "/account" },
  { icon: IconSettings, label: "Settings", link: "/settings" },
];

// Export Component
export default function NavBar(props: { active: number }) {
  const [active, setActive] = useState(props.active);
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
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({
          variant: "default",
          color: theme.primaryColor,
        }).background,
      })}
      className="navbar"
    >
      <Link href="/">
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
      <Navbar.Section grow className="links-container">
        {links}
      </Navbar.Section>
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

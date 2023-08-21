import { useMantineColorScheme, ActionIcon, Group } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <div className="container">
        <ActionIcon
          onClick={() => toggleColorScheme()}
          size="lg"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            color:
              theme.colorScheme === "dark"
                ? theme.colors.yellow[4]
                : theme.colors.blue[6],
          })}
        >
          {colorScheme === "dark" ? (
            <IconSun color="violet" size="1.2rem" />
          ) : (
            <IconMoonStars color="violet" size="1.2rem" />
          )}
        </ActionIcon>
      </div>
      <style>
        {`
        .container{
          position: absolute;
          top: 0;
          right: 0;
          margin: 2rem;
          z-index: 1000;
        }
      `}
      </style>
    </>
  );
}


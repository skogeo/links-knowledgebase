import { Link } from "react-router-dom";
import { Folder as FolderIcon } from "react-feather";
import { Card, Center, Flex, Grid, Title } from "@mantine/core";
import { Folder } from "../types/folder";
import { FileComponent } from "./FileComponent";

type Props = Folder & { path: string };

export const FolderComponent = ({ name, children, path }: Props) => {
  const formatPath = (childName: string) => {
    console.log(`${path}/${childName}`);
    return `${path ? path : ""}/${childName}`;
  };

  return (
    <div>
      <Flex mt={"md"}>
        <FolderIcon />
        <Title order={2}>{name}</Title>
      </Flex>
      <Grid>
        {children.map((child) => (
          <Grid.Col span={3} key={formatPath(child.slug)}>
            {child.type === "directory" ? (
              <Link to={formatPath(child.slug)}>
                <Card h={100} shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section h={50} bg={"cyan"}>
                    <Center h={"100%"}>
                      <FolderIcon />
                    </Center>
                  </Card.Section>
                  <Card.Section h={50}>
                    <Center h={"100%"}>{child.name}</Center>
                  </Card.Section>
                </Card>
              </Link>
            ) : (
              <FileComponent {...child} />
            )}
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

import { Card, Center, Text } from "@mantine/core";
import { File } from "react-feather";

type FileComponentProps = { name: string };

export const FileComponent = ({ name }: FileComponentProps) => {
  return (
    <Card h={100} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section h={50} bg={"gray"}>
        <Center h={"100%"}>
          <File />
        </Center>
      </Card.Section>
      <Card.Section h={50}>
        <Center h={"100%"}>
          <Text>{name}</Text>
        </Center>
      </Card.Section>
    </Card>
  );
};

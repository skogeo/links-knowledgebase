import { Flex, Title } from "@mantine/core";
import classes from './Heading.module.css';
import { Search } from "./Search";

export const Heading = () => (
  <Flex className={classes.root} h="100%" justify={"space-between"} align={"center"} gap={"md"}>
    <Title order={2}>Links Wiki</Title>
    <Search />
  </Flex>
);

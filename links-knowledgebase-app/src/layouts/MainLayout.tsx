import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Heading } from "../components/Heading";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const MainLayout = () => (
  <AppShell header={{ height: 60 }} padding="md">
    <AppShell.Header>
      <Heading />
    </AppShell.Header>
    <AppShell.Main>
      <Breadcrumbs />
      <Outlet />
    </AppShell.Main>
  </AppShell>
);

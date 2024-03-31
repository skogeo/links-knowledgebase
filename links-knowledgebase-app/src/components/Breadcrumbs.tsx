import { Breadcrumbs as MantineBradcrumbs } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

const baseRoute = { title: "home", href: "/" };

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const items = [
    baseRoute,
    ...pathname
      .split("/")
      .filter(Boolean)
      .map((path) => ({ title: path, href: path })),
  ];

  return (
    <MantineBradcrumbs>
      {items.map((item) => (
        <Link to={item.href} key={item.href}>
          {item.title}
        </Link>
      ))}
    </MantineBradcrumbs>
  );
};

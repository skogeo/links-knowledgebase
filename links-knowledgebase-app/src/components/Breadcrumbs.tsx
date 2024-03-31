import { Breadcrumbs as MantineBradcrumbs } from "@mantine/core";
import { Folder } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import classes from "./Breadcrumbs.module.css";

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
        <Link className={classes.breadcrumb} to={item.href} key={item.href}>
          <Folder size={18} />
          {item.title}
        </Link>
      ))}
    </MantineBradcrumbs>
  );
};

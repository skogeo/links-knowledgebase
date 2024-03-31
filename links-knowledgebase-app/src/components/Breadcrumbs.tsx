import { Breadcrumbs as MantineBradcrumbs } from "@mantine/core";
import { Folder } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import classes from "./Breadcrumbs.module.css";

const baseRoute = { title: "home", href: "/" };

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  // Initialize the items with the base route
  const items = pathname
    .split("/")
    .filter(Boolean) // Remove any empty strings from the array
    .reduce(
      (acc, curr, index, arr) => {
        const href = `/${arr.slice(0, index + 1).join("/")}`; // Construct the href
        acc.push({ title: curr, href }); // Add the current breadcrumb to the accumulator
        return acc;
      },
      [baseRoute]
    );

  return (
    <MantineBradcrumbs>
      {items.map((item) => (
        <Link
          relative={"path"}
          className={classes.breadcrumb}
          to={item.href}
          key={item.href}
        >
          <Folder size={18} />
          {item.title}
        </Link>
      ))}
    </MantineBradcrumbs>
  );
};

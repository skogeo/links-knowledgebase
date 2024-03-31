import { RouteObject } from "react-router-dom";

type Link = Omit<RouteObject, 'children'> & {
  type: 'link';
  title: string;
  href: string;
  description?: string;
};

type Directory = RouteObject & {
  type: 'directory'
  title: string;
  description?: string;
  children: Array<Link | Directory>
}

export type Page = Link | Directory
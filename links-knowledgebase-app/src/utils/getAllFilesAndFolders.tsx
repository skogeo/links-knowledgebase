import { RouteObject } from "react-router-dom";
import { Folder, Link } from "../types/folder";
import { FileComponent } from "../components/FileComponent";
import { FolderComponent } from "../components/FolderComponent";

// Helper function to flatten the folder structure and generate routes
export const getAllFilesAndFolders = (
  folders: Array<Folder | Link>,
  basePath = ""
): RouteObject[] => {
  let routes: RouteObject[] = [];

  folders.forEach((folder) => {
    const folderPath = `${basePath}/${folder.slug}`.replace(/\/+/g, "/");

    // Generate a route for the root item itself if it's a directory
    if (folder.type === "directory") {
      routes.push({
        path: folderPath,
        element: <FolderComponent {...folder} path={folderPath} />,
      });

      // Recursively generate routes for its children
      const childRoutes = folder.children
        .map((child) => getAllFilesAndFolders([child], folderPath))
        .flat();
      routes = [...routes, ...childRoutes];
    } else if (folder.type === "link") {
      // If the top-level item is a link, generate a route for it
      routes.push({
        path: folderPath,
        element: <FileComponent {...folder} />,
      });
    }
  });

  return routes;
};

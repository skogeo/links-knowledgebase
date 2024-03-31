import { RouteObject } from "react-router-dom";
import { Folder } from "../types/folder";
import { FileComponent } from "../components/FileComponent";
import { FolderComponent } from "../components/FolderComponent";

// Helper function to flatten the folder structure and generate routes
export const getAllFilesAndFolders = (folder: Folder, path = "") => {
  let routes: RouteObject[] = [];
  folder.children.forEach((child) => {
    // Ensure the path is absolute
    const childPath = `/${path}/${child.name}`.replace(/\/+/g, "/");
    if (child.type === "file") {
      routes.push({ path: childPath, element: <FileComponent {...child} /> });
    } else {
      routes.push({
        path: childPath,
        element: <FolderComponent {...child} path={childPath} />,
      });
      // Recursively generate routes, passing down the absolute path
      routes = routes.concat(getAllFilesAndFolders(child, childPath));
    }
  });
  return routes;
}
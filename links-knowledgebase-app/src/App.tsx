// App.js
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// App.js
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { FolderComponent } from "./components/FolderComponent";
import { FileComponent } from "./components/FileComponent";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { AppShell } from "@mantine/core";

const folderStructure = {
  name: "Root",
  children: [
    {
      type: "folder",
      name: "Folder 1",
      children: [
        { type: "file", name: "File 1.1" },
        { type: "file", name: "File 1.2" },
      ],
    },
    {
      type: "folder",
      name: "Folder 2",
      children: [
        { type: "file", name: "File 2.1" },
        {
          type: "folder",
          name: "Subfolder 2.2",
          children: [{ type: "file", name: "File 2.2.1" }],
        },
      ],
    },
    { type: "file", name: "File 3" },
  ],
};

// Helper function to flatten the folder structure and generate routes
function getAllFilesAndFolders(folder, path = "") {
  let routes = [];
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

// Define the root routes and dynamically generated routes from the folder structure
const routes = [
  {
    path: '/',
    element: (
      <AppShell>
        <Breadcrumbs />
        <Outlet />
      </AppShell>
    ),
    children: [
      {
        path: "",
        element: <FolderComponent {...folderStructure} path="" />, // Root path to render the base folder component
      },
      ...getAllFilesAndFolders(folderStructure), // Spread the dynamically generated routes for files and folders
    
    ]
  },
  {
    path: "*",
    element: <div>404 Not Found</div>, // Fallback for unmatched routes
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <AppShell>
      <RouterProvider router={router} />
    </AppShell>
  );
};

export default App;

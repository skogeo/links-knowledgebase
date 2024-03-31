// App.js
import "normalize.css";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FolderComponent } from "./components/FolderComponent";
import { AppShell } from "@mantine/core";
import { MainLayout } from "./layouts/MainLayout";
import { Folder } from "./types/folder";
import { getAllFilesAndFolders } from "./utils/getAllFilesAndFolders";
import { fetchAllDirectories } from "./api/fetchAllDirectories";
import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const folderStructure: Folder = {
  name: "Root",
  type: "directory",
  children: [
    {
      type: "directory",
      name: "Folder 1",
      children: [
        { type: "link", name: "File 1.1" },
        { type: "link", name: "File 1.2" },
      ],
    },
    {
      type: "directory",
      name: "Folder 2",
      children: [
        { type: "link", name: "File 2.1" },
        {
          type: "directory",
          name: "Subfolder 2.2",
          children: [{ type: "link", name: "File 2.2.1" }],
        },
      ],
    },
    { type: "link", name: "File 3" },
  ],
};

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [router, setRouter] = useState<any>(null);

  useEffect(() => {
    const fetchAndSetupRoutes = async () => {
      try {
        // Fetch the directory structure from the API
        const folderStructure = await fetchAllDirectories();

        // Dynamically generate routes based on the fetched directory structure
        const dynamicRoutes = getAllFilesAndFolders(folderStructure, "");

        const routes = [
          {
            path: "/",
            element: <MainLayout />,
            children: [
              {
                path: "",
                element: <FolderComponent {...folderStructure} path="/" />, // Adjusted for root path rendering
              },
              ...dynamicRoutes, // Spread the dynamically generated routes for files and folders
            ],
          },
          {
            path: "*",
            element: <div>404 Not Found</div>, // Fallback for unmatched routes
          },
        ];

        // Create a router instance with the dynamically generated routes
        const routerInstance = createBrowserRouter(routes);
        setRouter(routerInstance);
      } catch (error) {
        console.error("Failed to fetch directories or setup routes", error);
        // Handle errors or setup fallback routes as needed
      }
    };

    fetchAndSetupRoutes();
  }, []);

  if (!router) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <AppShell>
      <RouterProvider router={router} />
    </AppShell>
  );
};

export default App;

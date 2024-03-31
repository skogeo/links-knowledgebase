// App.js
import "normalize.css";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FolderComponent } from "./components/FolderComponent";
import { AppShell } from "@mantine/core";
import { MainLayout } from "./layouts/MainLayout";
import { Folder } from "./types/folder";
import { getAllFilesAndFolders } from "./utils/getAllFilesAndFolders";

const folderStructure: Folder = {
  name: "Root",
  type: "folder",
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

const App = () => {
  // Define the root routes and dynamically generated routes from the folder structure
  const routes = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <FolderComponent {...folderStructure} path="" />, // Root path to render the base folder component
        },
        ...getAllFilesAndFolders(folderStructure), // Spread the dynamically generated routes for files and folders
      ],
    },
    {
      path: "*",
      element: <div>404 Not Found</div>, // Fallback for unmatched routes
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <AppShell>
      <RouterProvider router={router} />
    </AppShell>
  );
};

export default App;

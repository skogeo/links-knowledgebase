// App.js
import "normalize.css";
import "@mantine/core/styles.css";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { FolderComponent } from "./components/FolderComponent";
import { AppShell } from "@mantine/core";
import { MainLayout } from "./layouts/MainLayout";
import { Folder } from "./types/folder";
import { getAllFilesAndFolders } from "./utils/getAllFilesAndFolders";
import { fetchAllDirectories } from "./api/fetchAllDirectories";
import { useState, useEffect } from "react";

// Example of structure
// const folderStructure: Folder = {
//   name: "Root",
//   type: "directory",
//   children: [
//     {
//       type: "directory",
//       name: "Folder 1",
//       children: [
//         { type: "link", name: "File 1.1" },
//         { type: "link", name: "File 1.2" },
//       ],
//     },
//     {
//       type: "directory",
//       name: "Folder 2",
//       children: [
//         { type: "link", name: "File 2.1" },
//         {
//           type: "directory",
//           name: "Subfolder 2.2",
//           children: [{ type: "link", name: "File 2.2.1" }],
//         },
//       ],
//     },
//     { type: "link", name: "File 3" },
//   ],
// };

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [router, setRouter] = useState<any>(null);

  useEffect(() => {
    const setupRoutes = async () => {
      try {
        const directoryStructureArray = await fetchAllDirectories(); // This should return an array
        const dynamicRoutes = getAllFilesAndFolders(
          directoryStructureArray,
          ""
        );

        const homeFolder: Folder = {
          type: "directory",
          slug: "home",
          name: "home",
          children: directoryStructureArray,
        };

        console.log(dynamicRoutes);

        const routes = [
          {
            path: "/",
            element: <MainLayout />,
            children: [
              {
                path: "",
                element: <FolderComponent {...homeFolder} path="" />, // Adjusted for root path rendering
              },
              ...dynamicRoutes, // Spread the dynamically generated routes for files and folders
            ],
          },
          {
            path: "*",
            element: <div>404 Not Found</div>, // Fallback for unmatched routes
          },
        ];

        setRouter(createBrowserRouter(routes));
      } catch (error) {
        console.error("Failed to set up routes:", error);
        // Handle error appropriately
      }
    };

    setupRoutes();
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

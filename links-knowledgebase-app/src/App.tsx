// App.js
import 'normalize.css';
import '@mantine/core/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FolderComponent } from './components/FolderComponent';
import { AppShell } from '@mantine/core';
import { MainLayout } from './layouts/MainLayout';
import { Folder } from './types/folder';
import { getAllFilesAndFolders } from './utils/getAllFilesAndFolders';
import { fetchAllDirectories } from './api/fetchAllDirectories';
import { useState, useEffect } from 'react';
import { login } from './api/login';
import { useQuery } from '@apollo/client';
import { GET_DIRECTORIES } from './queries/directories';

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
  const [router, setRouter] = useState<ReturnType<
    typeof createBrowserRouter
  > | null>(null);

  // test appolo client
  const { data } = useQuery(GET_DIRECTORIES);

  console.log(data);

  const loginAndGetDirectories = async () => {
    // Login and get JWT
    const loginData = await login();
    const jwt = loginData.jwt;

    // for appolo instance
    localStorage.setItem('jwtToken', jwt);

    // Now use the JWT to fetch all directories
    const directoryStructureArray = await fetchAllDirectories(jwt); // Adjust fetchAllDirectories to accept jwt
    return directoryStructureArray;
  };

  useEffect(() => {
    const setupRoutes = async () => {
      try {
        const directoryStructureArray = await loginAndGetDirectories(); // This should return an array
        const dynamicRoutes = getAllFilesAndFolders(
          directoryStructureArray,
          ''
        );

        const homeFolder: Folder = {
          type: 'directory',
          slug: 'home',
          name: 'home',
          children: directoryStructureArray,
        };

        const routes = [
          {
            path: '/',
            element: <MainLayout />,
            children: [
              {
                path: '',
                element: <FolderComponent {...homeFolder} path="" />, // Adjusted for root path rendering
              },
              ...dynamicRoutes, // Spread the dynamically generated routes for files and folders
            ],
          },
          {
            path: '*',
            element: <div>404 Not Found</div>, // Fallback for unmatched routes
          },
        ];

        setRouter(createBrowserRouter(routes));
      } catch (error) {
        console.error('Failed to set up routes:', error);
      }
    };

    setupRoutes();
  }, []);

  if (!router) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
};

export default App;

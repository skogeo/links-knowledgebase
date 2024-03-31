import { Folder, Link } from "../types/folder";

export const fetchAllDirectories = async () => {
  const response = await fetch("http://localhost:1337/api/directories/all");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data as Array<Folder | Link>;
}
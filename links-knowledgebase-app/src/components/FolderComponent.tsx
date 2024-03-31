// FolderComponent.js
import { Link } from "react-router-dom";
import { FileComponent } from "./FileComponent";
import { Folder } from "../types/folder";

type Props = Folder & { path: string }

export const FolderComponent = ({ name, children, path }: Props) => {
  return (
    <div className="folder-card">
      <div className="folder-header">
        <div className="folder-icon">📁</div>
        <div className="folder-name">{name}</div>
      </div>
      <div className="folder-contents">
        {children.map((child, index) => (
          <div key={index}>
            {child.type === "folder" ? (
              <Link to={`${path}/${child.name}`} className="folder-link">
                {child.name}
              </Link>
            ) : (
              <FileComponent {...child} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

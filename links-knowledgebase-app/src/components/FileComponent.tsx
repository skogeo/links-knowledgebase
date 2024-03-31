type FileComponentProps = { name: string }

export const FileComponent = ({ name }: FileComponentProps) => {
  return (
    <div className="file-card">
      <div className="file-icon">📄</div>
      <div className="file-name">{name}</div>
    </div>
  );
};

export type File = {
  type: 'file'
  name: string
}

export type Folder = {
  type: 'folder';
  name: string;
  children: Array<File | Folder>
}

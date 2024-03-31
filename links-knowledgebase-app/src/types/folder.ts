export type Link = {
  type: 'link'
  name: string
}

export type Folder = {
  type: 'directory';
  name: string;
  children: Array<Link | Folder>
}

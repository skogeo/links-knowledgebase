export type Link = {
  type: 'link'
  name: string
  slug: string
}

export type Folder = {
  type: 'directory';
  name: string;
  slug: string
  children: Array<Link | Folder>
}

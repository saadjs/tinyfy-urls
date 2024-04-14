export type LayoutProps = {
  title: string;
};

export type FormProps = {
  error?: string;
  url?: string;
  slug?: string;
};

type TableRow = [string, string];
export type TableProps = { rows: TableRow[] };

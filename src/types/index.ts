export type LayoutProps = {
  title: string;
};

export type FormProps = {
  error?: string;
  url?: string;
  slug?: string;
};

export type TableProps = { rows: Array<[string, string, number]> };

export type UrlRow = { url: string; slug: string; clicks: number };

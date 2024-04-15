import { html } from "https://deno.land/x/hono@v4.2.4/helper.ts";
import { PropsWithChildren } from "https://deno.land/x/hono@v4.2.4/jsx/types.ts";
import { LayoutProps } from "../types/index.ts";

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) =>
  html`<!DOCTYPE html>
  <html>
    <head>
    <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">
      <title>${title}</title>
    </head>
    <body>
    <h3>Tinyfy: Making Links Littler and Lives Easier!</h3>
      ${children}
    </body>
  </html>`;

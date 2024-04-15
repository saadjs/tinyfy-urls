import { html } from "https://deno.land/x/hono@v4.2.4/helper.ts";
import { PropsWithChildren } from "https://deno.land/x/hono@v4.2.4/jsx/types.ts";
import { LayoutProps } from "../types/index.ts";

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) =>
  html`<!DOCTYPE html>
  <html style="height: 100%">
    <head>
      <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">
      <title>${title}</title>
    </head>
    <body style="height: 100%">
      <div>
        <h3>Tinyfy: Making Links Littler and Lives Easier!</h3>
        ${children}
      </div>
      <footer style="position: sticky; top: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center">
        <div>
          <p>Created using Deno, Hono, Psql, JSX, and SimpleCSS.</p>
        </div>
        <div>Saad Bash &ensp;•&ensp; ${new Date().getFullYear()}</div>
      </footer>
    </body>
  </html>`;

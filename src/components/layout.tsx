/** @jsx jsx */
/** @jsxFrag Fragment */

import { jsx } from "https://deno.land/x/hono@v4.2.4/middleware.ts";
import { html } from "https://deno.land/x/hono@v4.2.4/helper.ts";
import { PropsWithChildren } from "https://deno.land/x/hono@v4.2.4/jsx/types.ts";
import { LayoutProps } from "../types/index.ts";
import { Footer } from "./footer.tsx";

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) =>
  html`<!DOCTYPE html>
  <html>
    <head>
    <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">
      <title>${title}</title>
    </head>
    <body>
    <h1>Deno, Hono + JSX URL Shortener</h1>
      ${children}
    </body>
  </html>`;

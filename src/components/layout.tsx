/** @jsx jsx */
/** @jsxFrag Fragment */

import {
  Fragment,
  html,
  jsx,
} from "https://deno.land/x/hono@v3.11.7/middleware.ts";
import { LayoutProps } from "../types/index.ts";
import { PropsWithChildren } from "https://deno.land/x/hono@v4.2.4/jsx/types.ts";

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

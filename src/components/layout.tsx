/** @jsx jsx */
/** @jsxFrag Fragment */

import { html, jsx, PropsWithChildren } from "../deps.ts";
import { LayoutProps } from "../types/index.ts";
import { Footer } from "./footer.tsx";

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) =>
  html`<!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">
      <link rel="stylesheet" href="/static/styles.css">
      <title>${title}</title>
    </head>
    <body>
      <div>
        <h3>Tinyfy: Link Less, Live More!</h3>
        ${children}
      </div>
      ${<Footer />}
    </body>
  </html>`;

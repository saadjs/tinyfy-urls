/** @jsx jsx */
/** @jsxFrag Fragment */

import {
  Fragment,
  html,
  jsx,
} from "https://deno.land/x/hono@v3.11.7/middleware.ts";
import { TableProps } from "../types/index.ts";

export const Table = ({ rows }: TableProps) => {
  return html`
      <table>
        <tr>
          <th>Full URL</th>
          <th>Short URL</th>
          <th>Clicks</th>
        </tr>
        ${
    rows.map((row) =>
      html`
          <tr>
            <td><a href="${row[0]}" target="_blank"/>${row[0]}</td>
            <td><a href="${row[1]}" target="_blank"/>${row[1]}</td>
            <td>${row[2]}</td>
          </tr>
        `
    )
  }
      </table>
    `;
};

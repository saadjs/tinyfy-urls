import { html } from "https://deno.land/x/hono@v3.11.7/middleware.ts";
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
            <td>${row[0]}</td>
            <td><a href="http://localhost:8000/${
        row[1]
      }" target="_blank" referredpolicy="no-referred" />http://localhost:8000/${
        row[1]
      }</td>
            <td>0</td>
          </tr>
        `
    )
  }
      </table>
    `;
};

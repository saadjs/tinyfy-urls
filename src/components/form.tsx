import { html } from "../deps.ts";
import { FormProps } from "../types/index.ts";

export const Form = ({ error, url, slug }: FormProps) => {
  return html`
        <form method="POST" action="/">
          <label for="url">URL:</label><br>
          <input type="url" id="url" name="url" value="${
    url || ""
  }" required><br>
          <label for="slug">Slug (optional):</label><br>
          <input type="text" id="slug" name="slug" value="${slug || ""}"><br>
          <input type="submit" value="Tinyfy ⚡️">
        </form>
        ${error ? html`<p>${error}</p>` : null}
      `;
};

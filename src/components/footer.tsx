import { html } from "../deps.ts";

export const Footer = () =>
  html`<footer class="footer">
            <div>
                <p>Created using Deno, Hono, Psql, JSX, and SimpleCSS.</p>
            </div>
            <div>
                <p>Saad Bash &ensp;•&ensp; © ${new Date().getFullYear()}</p>
            </div>
            <div>
                <a href="https://github.com/saadjs" target="_blank" rel="noopener noreferrer"><img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8cGF0aCBkPSJNMTAuOSwyLjFjLTQuNiwwLjUtOC4zLDQuMi04LjgsOC43Yy0wLjUsNC43LDIuMiw4LjksNi4zLDEwLjVDOC43LDIxLjQsOSwyMS4yLDksMjAuOHYtMS42YzAsMC0wLjQsMC4xLTAuOSwwLjEgYy0xLjQsMC0yLTEuMi0yLjEtMS45Yy0wLjEtMC40LTAuMy0wLjctMC42LTFDNS4xLDE2LjMsNSwxNi4zLDUsMTYuMkM1LDE2LDUuMywxNiw1LjQsMTZjMC42LDAsMS4xLDAuNywxLjMsMWMwLjUsMC44LDEuMSwxLDEuNCwxIGMwLjQsMCwwLjctMC4xLDAuOS0wLjJjMC4xLTAuNywwLjQtMS40LDEtMS44Yy0yLjMtMC41LTQtMS44LTQtNGMwLTEuMSwwLjUtMi4yLDEuMi0zQzcuMSw4LjgsNyw4LjMsNyw3LjZDNyw3LjIsNyw2LjYsNy4zLDYgYzAsMCwxLjQsMCwyLjgsMS4zQzEwLjYsNy4xLDExLjMsNywxMiw3czEuNCwwLjEsMiwwLjNDMTUuMyw2LDE2LjgsNiwxNi44LDZDMTcsNi42LDE3LDcuMiwxNyw3LjZjMCwwLjgtMC4xLDEuMi0wLjIsMS40IGMwLjcsMC44LDEuMiwxLjgsMS4yLDNjMCwyLjItMS43LDMuNS00LDRjMC42LDAuNSwxLDEuNCwxLDIuM3YyLjZjMCwwLjMsMC4zLDAuNiwwLjcsMC41YzMuNy0xLjUsNi4zLTUuMSw2LjMtOS4zIEMyMiw2LjEsMTYuOSwxLjQsMTAuOSwyLjF6Ij48L3BhdGg+Cjwvc3ZnPg=="/></a>
                <a href="https://linkedin.com/in/saadbash" target="_blank" rel="noopener noreferrer"><img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8cGF0aCBkPSJNMTksM0g1QzMuODk1LDMsMywzLjg5NSwzLDV2MTRjMCwxLjEwNSwwLjg5NSwyLDIsMmgxNGMxLjEwNSwwLDItMC44OTUsMi0yVjVDMjEsMy44OTUsMjAuMTA1LDMsMTksM3ogTTcuNzM4LDE3TDcuNzM4LDE3IGMtMC42OTcsMC0xLjI2Mi0wLjU2NS0xLjI2Mi0xLjI2MnYtNC40NzdDNi40NzcsMTAuNTY1LDcuMDQyLDEwLDcuNzM4LDEwaDBDOC40MzUsMTAsOSwxMC41NjUsOSwxMS4yNjJ2NC40NzcgQzksMTYuNDM1LDguNDM1LDE3LDcuNzM4LDE3eiBNNy42OTQsOC43MTdjLTAuNzcxLDAtMS4yODYtMC41MTQtMS4yODYtMS4yczAuNTE0LTEuMiwxLjM3MS0xLjJjMC43NzEsMCwxLjI4NiwwLjUxNCwxLjI4NiwxLjIgUzguNTUxLDguNzE3LDcuNjk0LDguNzE3eiBNMTYuNzc5LDE3TDE2Ljc3OSwxN2MtMC42NzQsMC0xLjIyMS0wLjU0Ny0xLjIyMS0xLjIyMXYtMi42MDVjMC0xLjA1OC0wLjY1MS0xLjE3NC0wLjg5NS0xLjE3NCBzLTEuMDU4LDAuMDM1LTEuMDU4LDEuMTc0djIuNjA1YzAsMC42NzQtMC41NDcsMS4yMjEtMS4yMjEsMS4yMjFoLTAuMDgxYy0wLjY3NCwwLTEuMjIxLTAuNTQ3LTEuMjIxLTEuMjIxdi00LjUxNyBjMC0wLjY5NywwLjU2NS0xLjI2MiwxLjI2Mi0xLjI2MmgwYzAuNjk3LDAsMS4yNjIsMC41NjUsMS4yNjIsMS4yNjJjMCwwLDAuMjgyLTEuMjYyLDIuMTk4LTEuMjYyQzE3LjAyMywxMCwxOCwxMC45NzcsMTgsMTMuMTc0IHYyLjYwNUMxOCwxNi40NTMsMTcuNDUzLDE3LDE2Ljc3OSwxN3oiPjwvcGF0aD4KPC9zdmc+"/></a>
            </div>
</footer>`;

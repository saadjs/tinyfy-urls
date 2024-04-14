import { load } from "https://deno.land/std@0.222.1/dotenv/mod.ts";
import {
  logger,
  serveStatic,
} from "https://deno.land/x/hono@v4.2.4/middleware.ts";
import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";
import { Hono } from "https://deno.land/x/hono@v4.2.4/mod.ts";
import * as nanoid from "https://deno.land/x/nanoid@v3.0.0/mod.ts";
import { Form, Layout, Table } from "./components/index.tsx";

const env = await load();
const PG_URL = env["PG_URL"];

const client = new Client(PG_URL);
await client.connect();

const app = new Hono();

app.use(logger());
app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

async function getTableData() {
  const data = await client.queryArray("SELECT url, slug FROM urls");
  const rows = data.rows as [string, string][];
  return rows;
}

app.get("/", async (c) => {
  return c.html(
    <>
      <Layout title="Hello Deno!">
        <Form />
        <Table rows={await getTableData()} />
      </Layout>
    </>,
  );
});

app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const data = await client.queryArray(
    `SELECT url FROM urls WHERE slug = $1`,
    [slug],
  );
  if (data.rows.length === 0) {
    return c.html(
      <Layout title="Not Found!">
        <p>❌ Not Found</p>
      </Layout>,
    );
  }
  const url = data.rows[0][0] as string;
  return c.redirect(url);
});

app.post("/", async (c) => {
  let url;
  let slug;
  try {
    const body = await c.req.parseBody();
    console.log({ body });
    url = body.url as string;
    slug = body.slug as string;

    if (!url) {
      throw new Error("URL is required");
    }

    // Check if URL is valid
    try {
      new URL(url);
    } catch (e) {
      throw new Error("Invalid URL");
    }

    if (!slug) {
      slug = nanoid.nanoid(5).toLowerCase();
    }

    const existing = await client.queryArray(
      `SELECT * FROM urls WHERE slug = $1`,
      [slug],
    );
    if (existing.rows.length > 0) {
      throw new Error("Slug already exists");
    }

    await client.queryArray(
      `INSERT INTO urls (url, slug) VALUES ($1, $2)`,
      [url, slug],
    );

    const shortUrl = `http://localhost:8000/${slug}`;

    return c.html(
      <>
        <Layout title="Hello Deno!">
          <Form />
          <p>
            ✅ Success <a href={shortUrl} target="_blank">{shortUrl}</a>
          </p>
          <Table rows={await getTableData()} />
        </Layout>
      </>,
    );
  } catch (e) {
    return c.html(
      <>
        <Layout title="Hello Deno!">
          <Form error={e.message} url={url} slug={slug} />
          <Table rows={await getTableData()} />
        </Layout>
      </>,
    );
  }
});

Deno.serve(app.fetch);

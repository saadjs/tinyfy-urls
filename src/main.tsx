/** @jsx jsx */
/** @jsxFrag Fragment */

import {
  Client,
  Fragment,
  Hono,
  jsx,
  load,
  logger,
  nanoid,
  rateLimiter,
  serveStatic,
} from "./deps.ts";
import { Form, Layout, Table } from "./components/index.tsx";

const env = await load();
const PG_URL = env["PG_URL"];

if (!PG_URL) {
  console.error("PG_URL is required");
  Deno.exit(1);
}

const client = new Client(PG_URL);
console.log("Connecting to database...");
await client.connect();
console.log("Connected to database?", client.connected);

const app = new Hono();

app.use(async (c, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
    return c.html(
      <Layout title="Tinify - Error!">
        <p>🚨 Something went wrong!</p>
      </Layout>,
    );
  }
});
app.use(logger());
app.use("/static/*", serveStatic({ root: "./" }));
app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));
// @ts-ignore: hono type mismatch
app.post("/", rateLimiter({ windowMs: 15 * 1000, limit: 1 }));

async function getTableData() {
  const data = await client.queryArray(
    "SELECT url, slug, clicks FROM urls ORDER BY created_at DESC",
  );
  const rows = data.rows as [string, string, string][];
  return rows;
}

app.get("/", async (c) => {
  return c.html(
    <>
      <Layout title="Tinyfy - Home">
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
      <Layout title="Tinyfy - Page Not Found!">
        <p>❌ Not Found</p>
      </Layout>,
    );
  }
  const url = data.rows[0][0] as string;
  await client.queryArray(
    `UPDATE urls SET clicks = clicks + 1 WHERE slug = $1`,
    [slug],
  );
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
      throw new Error("😱 Slug taken!");
    }

    await client.queryArray(
      `INSERT INTO urls (url, slug) VALUES ($1, $2)`,
      [url, slug],
    );

    const shortUrl = `https://tinyfy.xyz/${slug}`;

    return c.html(
      <>
        <Layout title="Tinyfy - Home">
          <Form />
          <p>
            ⚡️ Tinyfied ⚡️ <a href={shortUrl} target="_blank">{shortUrl}</a>
          </p>
          <Table rows={await getTableData()} />
        </Layout>
      </>,
    );
  } catch (e) {
    return c.html(
      <>
        <Layout title="Tinyfy - Home">
          <Form error={e.message} url={url} slug={slug} />
          <Table rows={await getTableData()} />
        </Layout>
      </>,
    );
  }
});

Deno.serve(app.fetch);

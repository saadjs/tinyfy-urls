/** @jsx jsx */
/** @jsxFrag Fragment */

import {
  Fragment,
  Hono,
  jsx,
  logger,
  nanoid,
  rateLimiter,
  serveStatic,
} from "./deps.ts";
import { Form, Layout, Table } from "./components/index.tsx";
import { validateSlug, validateUrl } from "./util/validation.ts";
import { query } from "./db.ts";
import { UrlRow } from "./types/index.ts";

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

async function getTableData(): Promise<Array<[string, string, number]>> {
  const data = await query(
    "SELECT url, slug, clicks FROM urls ORDER BY created_at DESC",
    [],
  ) as { rows: UrlRow[] };

  const rows: Array<[string, string, number]> = data.rows.map((
    row,
  ) => [row.url, row.slug, row.clicks]);

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
  const data = await query(
    `SELECT url FROM urls WHERE slug = $1`,
    [slug],
  ) as { rows: Array<{ url: string }> };
  if (data.rows.length === 0) {
    return c.html(
      <Layout title="Tinyfy - Page Not Found!">
        <p>❌ Not Found</p>
      </Layout>,
    );
  }
  const url = data.rows[0].url;
  await query(
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
    url = body.url as string;
    slug = body.slug as string;

    if (!url) {
      throw new Error("URL is required");
    }

    // Check if URL is valid
    if (!validateUrl(url)) {
      throw new Error("Invalid URL");
    }

    if (!slug) {
      slug = nanoid.nanoid(5).toLowerCase();
    }

    if (!validateSlug(slug)) {
      throw new Error("Invalid slug");
    }

    const existing = await query(
      `SELECT * FROM urls WHERE slug = $1`,
      [slug],
    );
    if (existing.rows.length > 0) {
      throw new Error("😱 Slug taken!");
    }

    await query(
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

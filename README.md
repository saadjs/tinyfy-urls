# Local Setup

1. Add `PG_URL` to `.env`

        cp .env.example .env

2. Start dev server

        deno task dev

# Deploy to staging

0. Install `deployctl`

        deno install -Arf jsr:@deno/deployctl

1. Deploy to staging

        deno task deploy:staging
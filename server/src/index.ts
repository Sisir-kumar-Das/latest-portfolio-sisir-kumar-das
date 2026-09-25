// Side-effect import: must be the first import so dotenv's config() runs
// before any other module (e.g. config/env.ts) reads process.env. Regular
// `import` statements are hoisted above plain statements under ESM, so a
// plain `dotenv.config()` call placed after other imports would run too late.
import 'dotenv/config';

import { app } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

void connectDB();

app.listen(env.PORT, () => {
  console.log(`Server listening on http://localhost:${env.PORT}`);
});


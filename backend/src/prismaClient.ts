import { PrismaClient } from "@prisma/client";

// Di Vercel (serverless) tiap instance cukup 1 koneksi, supaya pooler Supabase tidak kehabisan klien.
// Transaction pooler (port 6543) butuh pgbouncer=true, kalau tidak Prisma error "prepared statement ...".
function datasourceUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;
  const url = new URL(raw);
  let changed = false;
  if (process.env.VERCEL && !url.searchParams.has("connection_limit")) {
    url.searchParams.set("connection_limit", "1");
    changed = true;
  }
  if (url.port === "6543" && !url.searchParams.has("pgbouncer")) {
    url.searchParams.set("pgbouncer", "true");
    changed = true;
  }
  return changed ? url.toString() : undefined;
}

// Satu instance untuk seluruh aplikasi (hindari banyak koneksi saat hot-reload).
const prisma = new PrismaClient({
  datasourceUrl: datasourceUrl(),
  transactionOptions: { maxWait: 10000, timeout: 20000 },
});

export default prisma;

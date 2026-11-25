// Akun contoh untuk mencoba aplikasi. Menolak berjalan bila tabel staff sudah berisi.
// Isi ulang dari awal (menghapus semua staf & audit log): SEED_RESET=1 npm run seed — hanya dev.
import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { PrismaClient, StaffLevel } from "@prisma/client";

const prisma = new PrismaClient();

const ACCOUNTS: { name: string; level: StaffLevel; isAdmin: boolean; pin: string }[] = [
  { name: "Admin", level: "HEAD", isAdmin: true, pin: "1111" },
  { name: "Staf Contoh", level: "JUNIOR", isAdmin: false, pin: "2222" },
];

async function main() {
  if (process.env.SEED_RESET === "1") {
    await prisma.auditLog.deleteMany();
    await prisma.staff.deleteMany();
  } else if ((await prisma.staff.count()) > 0) {
    console.log("Tabel staff sudah berisi. Seed dibatalkan (pakai SEED_RESET=1 untuk mengulang).");
    return;
  }
  for (const a of ACCOUNTS) {
    await prisma.staff.create({
      data: { name: a.name, level: a.level, isAdmin: a.isAdmin, pinHash: await bcrypt.hash(a.pin, 10) },
    });
    console.log(`Akun dibuat: ${a.name} (PIN ${a.pin})`);
  }
  console.log("Ganti PIN contoh sebelum dipakai sungguhan.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

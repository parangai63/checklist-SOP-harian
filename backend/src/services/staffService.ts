import { Staff } from "@prisma/client";
import prisma from "../prismaClient";

/** Bentuk staf untuk response API (tanpa pinHash). */
export function serializeStaff(s: Staff) {
  return {
    id: s.id,
    name: s.name,
    level: s.level,
    isAdmin: s.isAdmin,
    active: s.active,
    createdAt: s.createdAt.toISOString(),
  };
}

export async function listStaff() {
  const rows = await prisma.staff.findMany({ where: { deletedAt: null }, orderBy: [{ active: "desc" }, { name: "asc" }] });
  return rows.map(serializeStaff);
}

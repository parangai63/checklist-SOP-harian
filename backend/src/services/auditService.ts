import { Prisma } from "@prisma/client";

type Tx = Prisma.TransactionClient;

/** Catat setiap mutasi di transaksi yang sama dengan perubahannya. Audit log tidak pernah diubah/dihapus. */
export async function logAudit(
  tx: Tx,
  staffId: number | null,
  entry: { action: string; entity: string; entityId?: string | number; before?: unknown; after?: unknown },
) {
  await tx.auditLog.create({
    data: {
      staffId,
      action: entry.action,
      entity: entry.entity,
      entityId: entry.entityId === undefined ? null : String(entry.entityId),
      before: entry.before === undefined ? Prisma.JsonNull : (entry.before as Prisma.InputJsonValue),
      after: entry.after === undefined ? Prisma.JsonNull : (entry.after as Prisma.InputJsonValue),
    },
  });
}

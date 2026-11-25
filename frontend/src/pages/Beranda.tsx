import { PageHeader, Panel } from "../components/ui";
import { useAuth } from "../context/AuthContext";

/** Ringkasan shift. Setup awal: sapaan saja; isi dari Original (progres checklist, posisi, cek keliling) menyusul. */
export default function BerandaPage() {
  const { user } = useAuth();
  return (
    <>
      <PageHeader title={`Halo, ${user?.name ?? ""}`} subtitle="Ringkasan shift hari ini" />
      <div className="mx-auto max-w-3xl space-y-3 p-4">
        <Panel title="Setup awal berhasil">
          <p className="m-0 text-muted">
            Login dan sesi sudah tersambung ke server. Modul checklist, kasir, SOP, pemeriksa, dan perencana akan dipindah dari
            versi Apps Script satu per satu.
          </p>
        </Panel>
      </div>
    </>
  );
}

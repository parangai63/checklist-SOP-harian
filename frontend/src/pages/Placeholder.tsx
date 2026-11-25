import { PageHeader, Panel } from "../components/ui";

/** Halaman untuk modul yang belum dipindah dari Original. Ganti dengan halaman sungguhan per fase. */
export default function PlaceholderPage({ title, hint }: { title: string; hint: string }) {
  return (
    <>
      <PageHeader title={title} subtitle={hint} />
      <div className="mx-auto max-w-3xl p-4">
        <Panel>
          <p className="m-0 text-muted">Halaman ini belum dibuat. Lihat fase di docs/SPESIFIKASI.md.</p>
        </Panel>
      </div>
    </>
  );
}

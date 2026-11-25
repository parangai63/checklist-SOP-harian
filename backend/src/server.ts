import dotenv from "dotenv";
dotenv.config();

import app from "./app";

// Port 4200 supaya tidak bentrok dengan Parang-ops / Yantos (4000) dan Keuangan (4100).
const PORT = process.env.PORT ? Number(process.env.PORT) : 4200;

app.listen(PORT, () => {
  console.log(`Checklist SOP Harian backend running on http://localhost:${PORT}`);
});

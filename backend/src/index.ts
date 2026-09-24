import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { MANUAL } from './data/manual';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

// Salud del servicio
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'tramites-notariales-tampa-api', time: new Date().toISOString() });
});

// Manual completo
app.get('/api/manual', (_req, res) => {
  res.json(MANUAL);
});

// Recursos individuales (útiles para el equipo si integran otras vistas)
app.get('/api/tarifas', (_req, res) => res.json(MANUAL.tarifas));
app.get('/api/tramites', (_req, res) => res.json(MANUAL.tramites));
app.get('/api/recordatorios', (_req, res) => res.json(MANUAL.recordatorios));

// En producción, sirve el frontend compilado si existe (frontend/dist)
const distDir = path.resolve(__dirname, '../../frontend/dist');
if (existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`API de Trámites Notariales escuchando en http://localhost:${PORT}`);
  console.log(`  → GET /api/manual`);
});

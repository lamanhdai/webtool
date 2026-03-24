import express from 'express';
import cors from 'cors';
import transcriptionRoutes from './routes/transcriptionRoutes.js';
import { env } from './config/env.js';

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
  }),
);
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'speech-stt-backend' });
});

app.use('/', transcriptionRoutes);

app.use((err, _req, res, _next) => {
  const message = err?.message || 'Unexpected server error';
  const status = err?.name === 'MulterError' ? 400 : 500;
  res.status(status).json({ ok: false, error: message });
});

app.listen(env.port, () => {
  console.log(`Speech STT backend listening on http://localhost:${env.port}`);
});

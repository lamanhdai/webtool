import dotenv from 'dotenv';

dotenv.config();

const required = ['JWT_SECRET', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`[warn] Missing env var: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_replace_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  databasePath: process.env.DATABASE_PATH || './data/app.db',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    folder: process.env.CLOUDINARY_FOLDER || '',
    signedUrlTtlSeconds: Number(process.env.SIGNED_URL_TTL_SECONDS || 120),
  },
};

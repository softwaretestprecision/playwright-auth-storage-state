import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}. Copy .env.example to .env (or set it in CI secrets).`);
  }
  return value;
}

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  users: {
    standard: { username: required('STANDARD_USER'), password: required('PASSWORD') },
    visual: { username: required('VISUAL_USER'), password: required('PASSWORD') },
  },
};

export const authFile = {
  standard: 'playwright/.auth/standard.json',
  visual: 'playwright/.auth/visual.json',
};

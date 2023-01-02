import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = 'iPxFY5ywyLBQqXle7Uw1';
export const DB_HOST = 'containers-us-west-43.railway.app';
export const DB_DATABASE = 'railway';
export const DB_PORT = 6315;

 
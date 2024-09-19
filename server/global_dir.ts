import path from 'node:path'

export const __basedir = path.dirname(__dirname);
export const __baseurl = `https://${process.env.HOSTNAME}:${process.env.PORT}`;
export const __urlImage = `https://127.0.0.1:3001`
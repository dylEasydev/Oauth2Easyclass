import {dirname} from 'node:path'

//chemin du dossier racine  du projet
export const __basedir = dirname(__dirname);

//url de base du serveur .
export const __baseurl = `https://${process.env.HOSTNAME}:${process.env.PORT}`;
//url du serveur d'image .
export const __urlImage = `https://127.0.0.1:3001`
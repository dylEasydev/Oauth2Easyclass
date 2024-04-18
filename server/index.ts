import expressServer from './app';
import http from 'http';
import { initDb } from './db/initdb';



const port:unknown = process.env.PORT ;
const hostName = process.env.HOSTNAME;

const authServer = http.createServer(expressServer);

initDb().then(()=>console.log(`synchronisation réussi`)).catch(error => console.log(`Error:${error}`));

try {
    authServer.listen(port as number , hostName,()=>{
        console.log(`Notre serveur tourne à l'adresse http://${hostName}:${port}`)
    })
} catch (error) {
    console.log(`Une erreur est survenu lors du démarrage du serveur\n.Veillez verifier erreur:${error} puis rédemarrer`)
}
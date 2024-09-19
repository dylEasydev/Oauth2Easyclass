import expressServer from './app';
import http from 'node:http2';
import fs from 'node:fs';
import path from 'node:path';
import { __basedir } from './global_dir';

export const launchHttpServer = ()=>{
    const port:unknown = process.env.PORT ;
    const hostName = process.env.HOSTNAME;
    
    const options = {
    	key:fs.readFileSync(path.join(__basedir,'server.key')),
    	cert:fs.readFileSync(path.join(__basedir ,'server.crt')),
        allowHTTP1:true
    }
    
    const authServer = http.createSecureServer(options,expressServer);
     
    try {
        authServer.listen(port as number , hostName,()=>{
            console.log(`Notre serveur tourne à l'adresse https://${hostName}:${port}`)
        })
    } catch (error) {
        console.log(`Une erreur est survenu lors du démarrage du serveur\n.Veillez verifier erreur:${error} puis rédemarrer`)
    }
}

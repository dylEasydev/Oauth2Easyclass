import expressServer from './app';
import http from 'node:http2';
import fs from 'node:fs';
import { join }from 'node:path';
import { __basedir } from './global_dir';

export const launchHttpServer = ()=>{
    const port:unknown = process.env.PORT ;
    const hostName = process.env.HOSTNAME;

    //options du serveur sécurisé  HTTP/2 
    const options = {
    	key:fs.readFileSync(join(__basedir,'server.key')),
    	cert:fs.readFileSync(join(__basedir ,'server.crt')),
        allowHTTP1:true //passage à HTTTP/1.1 pour les client ne supportant pas  HTTP/2
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

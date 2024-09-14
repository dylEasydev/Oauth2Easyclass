import fs from 'node:fs/promises';
import path from 'node:path';
import { __basedir } from '../global_dir';

class ReadScope{
    readScopeApp(fileName:string){
        return new Promise<
            {
                scopeName:string;
                scopeDescript:string;
            }[]
        >(async (resolve, reject) => {
            try {
                const path_director = path.join(__basedir , `/ressources/${fileName}.json`);
                const data = await fs.readFile(path_director,'utf-8');
                const dataJson :{
                    data:{
                        scopeName:string;
                        scopeDescript:string;
                    }[];
                } = JSON.parse(data);

                resolve(dataJson.data);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new ReadScope();
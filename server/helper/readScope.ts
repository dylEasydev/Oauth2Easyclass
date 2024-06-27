import fs from 'node:fs';
import path from 'path';
import { __basedir } from '../global_dir';

class ReadScope{
    readScopeApp(fileName:string){
        const path_director = path.join(__basedir , `/ressources/${fileName}.json`);
        const data = fs.readFileSync(path_director,'utf-8');
        const dataJson :{
            data:{
                scopeName:string;
                scopeDescript:string;
            }[];
        } = JSON.parse(data);

        return dataJson.data;
    }
}

export default new ReadScope();
import { readScope } from '../../helper';
import {Role} from '../association';
export const scopeApp = readScope.readScopeApp('scopeApp');

Role.afterCreate((role ,options)=>{
    return new Promise<void>((resolve, reject)=>{
        role.addListScope(options.transaction).then(()=>{
            resolve();
        }).catch(error=>reject(error));
    })
})

export {Role};
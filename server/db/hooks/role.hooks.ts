import {Role} from '../association';
export const scopeApp = [{
    scopeName:'created:admin',
    scopeDescript:'permissions de créer un admin'
}]

Role.afterCreate((role ,options)=>{
    return new Promise<void>((resolve, reject)=>{
        role.addListScope(options.transaction).then(()=>{
            resolve();
        }).catch(error=>reject(error));
    })
})

export {Role};
import {StudentTemp} from '../init';
import { CodeVerif } from '../../db';
import bcrypt from 'bcryptjs';
import { generateCode } from '../../helper';

StudentTemp.afterValidate(student =>{
    return new Promise<void>((resolve, reject) => {
        bcrypt.hash(student.password , 10 ).then(passHash=>{
            student.password = passHash;
            resolve();
        }).catch(error=>{
            reject(error);
        });
    });
})

StudentTemp.afterCreate((student , options)=>{
    return new Promise<void>((resolve, reject) => {
        const expiresAt = new Date(Date.now());
        expiresAt.setHours(expiresAt.getHours()+1);
        student.createCodeVerif({
            codeverif:parseInt(generateCode.generateId(6)),
            expiresAt
        },{transaction:options.transaction,hooks:false})
        .then(code=>resolve()).catch(error=> reject(error));
    })
})

StudentTemp.afterDestroy((instances,options )=>{
    return new Promise<void>((resolve, reject) => {
        CodeVerif.destroy({
            where:{
                foreignId:instances.id,
                nameTable:StudentTemp.tableName
            },
            transaction:options.transaction
        }).then(()=>resolve()).catch(error => reject(error));
    })
})

export {StudentTemp};
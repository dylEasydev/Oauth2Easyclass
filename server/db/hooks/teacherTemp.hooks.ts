import {TeacherTemp} from '../init';
import { CodeVerif } from '../../db';
import bcrypt from 'bcryptjs';
import { generateCode } from '../../helper';

TeacherTemp.afterValidate(teacher =>{
    return new Promise<void>((resolve, reject) => {
        bcrypt.hash(teacher.password , 10 ).then(passHash=>{
            teacher.password = passHash;
            resolve();
        }).catch(error=>{
            reject(error);
        });
    });
})

TeacherTemp.afterCreate((teacher , options)=>{
    return new Promise<void>((resolve, reject) => {
        const expiresAt = new Date(Date.now());
        expiresAt.setHours(expiresAt.getHours()+1);
        teacher.createCodeVerif({
            codeverif:parseInt(generateCode.generateId(6)),
            expiresAt
        },{transaction:options.transaction,hooks:true})
        .then(code=>resolve()).catch(error=> reject(error));
    })
})


TeacherTemp.afterDestroy((instances,options) =>{
    return new Promise<void>((resolve, reject) => {
        CodeVerif.destroy({
            where:{
                foreignId:instances.id,
                nameTable:TeacherTemp.tableName
            },
            transaction:options.transaction
        }).then(()=>resolve()).catch(error => reject(error));
    })
})

export {TeacherTemp};
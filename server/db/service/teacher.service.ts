import {TeacherTemp } from '../../db';
import sequelizeConnect from '../config';
import { UserTempService } from './userTemp.service';
import { UserTempServiceInterface } from './interface';
import { Op } from 'sequelize';
import codeVerifService from './codeVerif.service';

class TeacherService extends UserTempService implements UserTempServiceInterface{
    findUserById(id: number){
        return new Promise<TeacherTemp|null>(async(resolve, reject) => {
            try {
                const teacherFind = await sequelizeConnect.transaction(async t =>{
                    return await TeacherTemp.findByPk(id,{
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(`(
                                        SELECT codeverif FROM codeVerif as code
                                        WHERE 
                                            code.foreignId = TeacherTemp.id
                                            AND
                                            code.nameTable = "teacherTemp"
                                        LIMIT 1
                                    )`),`codeVerif`
                                ]
                            ]
                        }
                    });
                });
                resolve(teacherFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    findUserByName(userName?: string , mail?:string){
        return new Promise<TeacherTemp|null>(async(resolve, reject) => {
            try {
                const name = userName? userName:' ';
                const email = mail? mail: ' '; 
                const teacherFind = await sequelizeConnect.transaction(async t=>{
                    return await TeacherTemp.findOne({
                        where:{
                            [Op.or]:{
                                userName:name,
                                addressMail:email
                            }
                        },
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(`(
                                        SELECT codeverif FROM codeVerif as code
                                        WHERE 
                                            code.foreignId = TeacherTemp.id
                                            AND
                                            code.nameTable = "teacherTemp"
                                        LIMIT 1
                                    )`),`codeVerif`
                                ]
                            ]
                        }
                    });
                });
                resolve(teacherFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    createUser(user:{ 
        userName: string; adressMail: string; password: string;
        subjetName?:string
     }){
        return new Promise<TeacherTemp>(async (resolve, reject) => {
            try {
                const subject = user.subjetName? user.subjetName : "";
                const teacherFind = await this.findUserByName(user.userName,user.adressMail);
                if(teacherFind !== null){
                    const teacherUpdate = await sequelizeConnect.transaction(async t=>{
                        return teacherFind.update({
                            userName:user.userName,
                            addressMail:user.adressMail,
                            password:user.password,
                            subjectName:subject
                        })
                    })
                    teacherUpdate.set('codeVerif',teacherFind.get('codeVerif'));
                    await codeVerifService.updateCodeVerif(teacherUpdate);
                    resolve(teacherUpdate);
                }else{
                    const teacherTemp = await sequelizeConnect.transaction(async t=>{
                        return await TeacherTemp.create({
                            userName:user.userName,
                            addressMail:user.adressMail,
                            password:user.password,
                            subjectName:subject
                        });
                    })
                    resolve(teacherTemp);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}

const teacherService = new TeacherService();
export default teacherService; 
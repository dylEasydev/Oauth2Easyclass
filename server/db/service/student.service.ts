import sequelizeConnect from '../config';
import { StudentTemp} from '../../db';
import { UserTempService } from './userTemp.service';
import { UserTempServiceInterface } from './interface';
import { Op } from 'sequelize';
import codeVerifService from './codeVerif.service';

class StudentService extends UserTempService implements UserTempServiceInterface{
    findUserById(id: number){
        return new Promise<StudentTemp|null>(async(resolve, reject) => {
            try {
                const studentFind = await sequelizeConnect.transaction(async t=>{
                    return await StudentTemp.findByPk(id,{
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(`(
                                        SELECT codeverif FROM codeVerif as code
                                        WHERE 
                                            code.foreignId = studentTemp.id
                                            AND
                                            code.nameTable = "studentTemp"
                                        LIMIT 1
                                    )`),`codeVerif`
                                ]
                            ]
                        }
                    });
                });
                resolve(studentFind);                
            } catch (error) {
                reject(error);
            }
        })
    }

    findUserByName(userName?: string, mail?:string){
        return new Promise<StudentTemp|null>(async(resolve, reject) => {
            try {
                const name = userName? userName:' ';
                const email = mail? mail:' ';
                const studentFind = await sequelizeConnect.transaction(async t=>{
                    return await StudentTemp.findOne({
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
                                            code.foreignId = studentTemp.id
                                            AND
                                            code.nameTable = "studentTemp"
                                        LIMIT 1
                                    )`),`codeVerif`
                                ]
                            ]
                        }
                    });
                });
                resolve(studentFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    createUser<T extends { 
        userName: string; adressMail: string; password: string; 
    }>(user: T){
        return new Promise<StudentTemp>(async(resolve, reject) => {
            try {
                const studentFind = await this.findUserByName(user.userName,user.adressMail);
                if(studentFind !== null){
                    const studentUpdate = await sequelizeConnect.transaction(async t=>{
                        return await studentFind.update({
                            userName:user.userName,
                            addressMail:user.adressMail,
                            password:user.password
                        })
                    })
                    studentUpdate.set('codeVerif',studentFind.get('codeVerif'));
                    await codeVerifService.updateCodeVerif(studentUpdate);
                    resolve(studentUpdate)   ;
                }else{
                    const student = await sequelizeConnect.transaction(async t=>{
                        return await StudentTemp.create({
                            userName:user.userName,
                            addressMail:user.adressMail,
                            password:user.password
                        });
                    });
                    resolve(student);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}

const studentService = new StudentService();

export default studentService;
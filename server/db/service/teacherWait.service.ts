import { Op } from 'sequelize';
import { TeacherWaiting } from '../../db';
import sequelizeConnect from '../config';
import { TeacherWaitingService } from './interface';

class TeacherWaitService implements TeacherWaitingService{
    findTeacherByNameAndMail(username: string, email: string){
        return new Promise<TeacherWaiting|null>(async (resolve, reject) => {
            try {
                const name = username? username:' ';
                const mail = email? email: ' '; 
                 const teacher = await sequelizeConnect.transaction(async t=>{
                    return await TeacherWaiting.findOne({
                        where:{
                            [Op.or]:{
                                userName:name,
                                addressMail:mail,
                            }
                        }                        
                    })
                 })
                 resolve(teacher);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new TeacherWaitService();
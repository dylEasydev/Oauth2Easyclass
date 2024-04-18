import { 
    InferAttributes ,InferCreationAttributes,CreateOptions,Optional
} from 'sequelize';
import { 
    CodeVerifInterface, UserTempInterface 
} from '../interface';
import sequelizeConnect from '../config';
import { CodeVerif, TeacherWaiting } from '../../db';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { UserBase } from './userBase.model';


export class TeacherTemp extends UserBase implements UserTempInterface{
    //attributs du models
    declare subjectName:string;

    //Methodes mixins
    createCodeVerif(
        value:Optional<
            InferCreationAttributes<
                CodeVerifInterface>,
                NullishPropertiesOf<CodeVerifInterface>
            >,
        options?:CreateOptions<InferAttributes<CodeVerifInterface>>
    ){
        return new Promise<CodeVerifInterface>(async(resolve, reject) => {
            try {
                const codeverif = await CodeVerif.create({
                    foreignId:this.id,
                    nameTable:TeacherTemp.tableName,
                    codeverif:value.codeverif,
                    expiresAt:value.expiresAt
                },options);
                resolve(codeverif);
            } catch (error) {
                reject(error);
            }
        })
    }

    savePerm(){
        return new Promise<UserTempInterface>(async(resolve, reject) => {
            try {
                const teacher = await sequelizeConnect.transaction(async t=>{
                    return await TeacherWaiting.create({
                        userName:this.userName,
                        addressMail:this.addressMail,
                        password:this.password,
                        subjectName:this.subjectName
                    })
                })
                resolve(teacher);
            } catch (error) {
                reject(error);
            }
        })
    } 
}

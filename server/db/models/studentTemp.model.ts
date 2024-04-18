import { 
    InferAttributes ,InferCreationAttributes,Optional,CreateOptions
} from 'sequelize';
import { 
    CodeVerifInterface, UserTempInterface,UserPermInterface
} from '../interface';
import sequelizeConnect from '../config';
import { User,CodeVerif} from '../../db';
import { generateCode } from '../../helper';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { UserBase } from './userBase.model';


export class StudentTemp extends UserBase implements UserTempInterface{
    //methodes de mixins
    createCodeVerif(
        value:Optional<
            InferCreationAttributes<CodeVerifInterface>,
            NullishPropertiesOf<CodeVerifInterface>
        >,
        options?:CreateOptions<InferAttributes<CodeVerifInterface>>
    ){
        return new Promise<CodeVerifInterface>(async (resolve, reject) => {
            try {
                const codeverif = await CodeVerif.create({
                    foreignId:this.id,
                    nameTable:StudentTemp.tableName,
                    codeverif:value.codeverif,
                    expiresAt:value.expiresAt
                },options);
                resolve(codeverif);
            } catch (error) {
                reject(error);
            }
        })
    }

    //Méthodes 
    savePerm(){
        return new Promise<UserPermInterface>(async (resolve, reject) => {
            try {
                const student = await sequelizeConnect.transaction(async t=>{
                    const newUser = await User.create({
                        userName:this.userName,
                        addressMail:this.addressMail,
                        password:this.password
                    },{hooks:false});

                    await newUser.createImage(undefined,{
                        transaction:t
                    });
                    await newUser.createRole({
                        roleName:'student',
                        roleDescript:`ce role est celui d'un étudiant`
                    })
                    const expiresAt = new Date(Date.now());
                    expiresAt.setHours(expiresAt.getHours()+1);
                    await newUser.createCodeVerif({
                        codeverif:parseInt(generateCode.generateId(4)),
                        expiresAt
                    },{
                        transaction:t,
                        hooks:false
                    })
                    return newUser;
                });
                resolve(student);
            } catch (error) {
                reject(error);
            }
        })
    }
}
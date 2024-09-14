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

/**
 * models des étudiants en cours d'enregistrements
 */
export class StudentTemp extends UserBase implements UserTempInterface{
    
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

    savePerm(){
        return new Promise<UserPermInterface>(async (resolve, reject) => {
            try {
                //initialisation de la transaction
                const student = await sequelizeConnect.transaction(async t=>{
                    const newUser = await User.create({
                        userName:this.userName,
                        addressMail:this.addressMail,
                        password:this.password
                    },{hooks:false});

                    //creation de l'image associer 
                    await newUser.createImage(undefined,{
                        transaction:t
                    });
                    //creation du rôle 
                    await newUser.createRole({
                        roleName:'student',
                        roleDescript:`Ce rôle est celui d'un étudiant`
                    })
                    const expiresAt = new Date(Date.now());
                    expiresAt.setHours(expiresAt.getHours()+1);

                    //creation du code de verification 
                    await newUser.createCodeVerif({
                        codeverif:parseInt(generateCode.generateId(6)),
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
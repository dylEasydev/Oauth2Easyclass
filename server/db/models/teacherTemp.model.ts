import { 
    InferAttributes ,InferCreationAttributes,CreateOptions,Optional
} from 'sequelize';
import { 
    CodeVerifInterface, UserBaseInterface, UserTempInterface 
} from '../interface';
import sequelizeConnect from '../config';
import { CodeVerif, TeacherWaiting } from '../../db';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { UserBase } from './userBase.model';

/**
 * Models d'enseignants en cours d'enregistrements
 */
export class TeacherTemp extends UserBase implements UserTempInterface{

    declare subjectName:string;

    /**
      J'ai pas utiliser les association et Methodes de Mixin à
      cause du prblèmes de contraintes des  associations polymorphes
     */
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
                    //ici on passe le nom de la table associer à ce code de vérification
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

    /**
     * Elle permet de sauvegarder un enseignant temporaire parmis 
     * ceux en attente de validation par les administrateur .
     */
    savePerm(){
        return new Promise<UserBaseInterface>(async(resolve, reject) => {
            try {
                /*
                *initialisations de la transaction pour eviter
                *l'irreversibilitée des operations   durant la requêtes
                */ 
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

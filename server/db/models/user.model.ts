import { 
    Association,NonAttribute,HasOneCreateAssociationMixin,
    InferAttributes, InferCreationAttributes,CreateOptions, Optional
} from 'sequelize';
import { 
    AuthorizationCodeInterface, ClientInterface, CodeVerifInterface, ImageInterface,
    RoleInterface, TokenInterface, UserPermInterface 
} from '../interface';
import { CodeVerif, Image } from '../../db';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { UserBase } from './userBase.model';

export class User extends UserBase implements UserPermInterface{
     
    declare clients?: NonAttribute<ClientInterface[]>| undefined;
    declare tokens?: NonAttribute<TokenInterface[]> | undefined;
    declare codeVerif?: NonAttribute<number> | undefined;
    declare image?: NonAttribute<string> | undefined;
    declare authCodes?: NonAttribute<AuthorizationCodeInterface[]> |undefined;
    declare role?: NonAttribute<RoleInterface> | undefined;

     
    static associations: { 
        clients: Association<UserPermInterface, ClientInterface>; 
        tokens: Association<UserPermInterface, TokenInterface>;
        authCodes: Association<UserPermInterface , AuthorizationCodeInterface>;
        role: Association<UserPermInterface , RoleInterface>;
    };

    /**
     * 
     * @param value 
     * @param options 
     * @returns {Promise<ImageInterface>}
     */
    createImage(
        value?:Optional<
            InferCreationAttributes<ImageInterface>,
            NullishPropertiesOf<ImageInterface>
        >, 
        options?:CreateOptions<InferAttributes<ImageInterface>>
    ){
        return new Promise<ImageInterface>(async (resolve, reject) => {
            try {
                const image = await Image.create({
                    foreignId:this.id,
                    nameTable:User.tableName,
                    urlPictures:value?.urlPictures,
                    picturesName:value?.picturesName
                },options);
                resolve(image);
            } catch (error) {
                reject(error);
            }
        })
    }
    /**
     * 
     * @param value 
     * @param options 
     * @returns {Promise<CodeVerifInterface>}
     */ 
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
                    nameTable:User.tableName,
                    codeverif:value.codeverif,
                    expiresAt:value.expiresAt
                },options);
                resolve(codeverif);
            } catch (error) {
                reject(error);
            }
        })
    }
    
    declare createRole: HasOneCreateAssociationMixin<RoleInterface>;
}
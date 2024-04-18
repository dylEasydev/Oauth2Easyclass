import { 
    ForeignKey, Model, NonAttribute,CreationOptional, InferAttributes, 
    InferCreationAttributes 
} from 'sequelize';
import { UserPermInterface,ClientInterface } from '../interface';

/**
 * cette interface ne sera pas implementer elle représente 
 * le type virtuel d'un jeton d'accès
 */
export interface AccessToken extends Model<
    InferAttributes<AccessToken>,
    InferCreationAttributes<AccessToken>
>{
    //attributs de base de l'interface 
    id:CreationOptional<number>;
    accessToken:string;
    accessTokenExpiresAt:Date;
    scope:string[];

    //clé étrangère
    userId: ForeignKey<UserPermInterface['id']>
    clientId:ForeignKey<ClientInterface['id']>;

    //objet de Eagger logging
    user?:NonAttribute<UserPermInterface>|undefined;
    client?:NonAttribute<ClientInterface>|undefined;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
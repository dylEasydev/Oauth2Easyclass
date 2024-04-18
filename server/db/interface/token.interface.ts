import { 
    ForeignKey, Model, NonAttribute,CreationOptional,
    InferAttributes, InferCreationAttributes 
} from 'sequelize';
import { UserPermInterface,ClientInterface } from '../interface';

/*
    interface des jeton jwt des clients et utilisateurs :
    un accessToken  et un refresh token pour rédemander à nouveau accès
*/
export interface TokenInterface extends Model<
    InferAttributes<TokenInterface>,
    InferCreationAttributes<TokenInterface>
>{
    //atttributs de base de interface Token
    id:CreationOptional<number>;
    accessToken:string;
    accessTokenExpiresAt:Date;
    refreshToken:string;
    refreshTokenExpiresAt:Date;
    scope:string[];

    //clés etrangères des associations avec d'autres Models
    userId: ForeignKey<UserPermInterface['id']>
    clientId:ForeignKey<ClientInterface['id']>;

    //objets de eagger logging des association d'Interface Token
    user?:NonAttribute<UserPermInterface>|undefined;
    client?:NonAttribute<ClientInterface>|undefined;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
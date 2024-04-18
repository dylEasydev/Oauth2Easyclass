import { 
    Model ,CreationOptional, InferAttributes, InferCreationAttributes,
    ForeignKey, NonAttribute
} from 'sequelize';
import { ClientInterface, UserPermInterface } from '../interface';

/**
 * interface de code authorisation pour avoir un un jeton 
 * d'accès 
 */
export interface AuthorizationCodeInterface extends Model<
    InferAttributes<AuthorizationCodeInterface>,
    InferCreationAttributes<AuthorizationCodeInterface>
>{
    //attributs de base de l'interface
    id:CreationOptional<number>;
    authorizationCode:string;
    redirectUri:string;
    expiresAt:Date;
    scope:string[];
    codeChallenge?:CreationOptional<string>;
    codeChallengeMethod?:CreationOptional<string>;

    //clés étrangères
    userId:ForeignKey<UserPermInterface['id']>;
    clientId:ForeignKey<UserPermInterface['id']>;

    //objets de Eagger logging
    user?:NonAttribute<UserPermInterface>|undefined;
    client?:NonAttribute<ClientInterface>|undefined;

    //timesTamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
} 
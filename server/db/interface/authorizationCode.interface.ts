import { 
    Model ,CreationOptional, InferAttributes, InferCreationAttributes,
    ForeignKey, NonAttribute
} from 'sequelize';
import { ClientInterface, UserPermInterface } from '../interface';

/**
 * interface de code d'authorisation fourni à un client 
 * lors d'une demande d'authentification avec octroi 
 * authorization_code
 */
export interface AuthorizationCodeInterface extends Model<
    InferAttributes<AuthorizationCodeInterface>,
    InferCreationAttributes<AuthorizationCodeInterface>
>{

    id:CreationOptional<number>;
    authorizationCode:string;
    redirectUri:string;
    expiresAt:Date;

    /**
     * permissions demandées par ce code d'authorisation
     */
    scope:string[];
    //code de securité pour verifier si c'est bien le client qui demande l'accès
    codeChallenge?:CreationOptional<string>;
    /**
     * possède 2 valeur 'plain' ou 'sh256'
     * plain lorsque les codeChallenge n'est pa hachés et 
     * sh256 lorsque le code est haché avec la méthode sha256
     */
    codeChallengeMethod?:CreationOptional<string>;

    //foreignKey
    userId:ForeignKey<UserPermInterface['id']>;
    clientId:ForeignKey<UserPermInterface['id']>;
    
    //objets de eagger logging
    user?:NonAttribute<UserPermInterface>|undefined;
    client?:NonAttribute<ClientInterface>|undefined;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
} 

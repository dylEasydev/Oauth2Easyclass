import { 
    Model,InferAttributes, InferCreationAttributes,
    ForeignKey, NonAttribute, CreationOptional
} from 'sequelize';
import { 
    AuthorizationCodeInterface,InfoClientInterface,
    TokenInterface, UserPermInterface 
} from '../interface';
import { BelongsToGetAssociationMixin } from 'sequelize';

/**
 * interface représentant un client (application voulant utiliser nos services)
 */
export interface ClientInterface extends Model<
    InferAttributes<ClientInterface>,
    InferCreationAttributes<ClientInterface>
>{
    //attributs de l'interface
    id:CreationOptional<number>;
    clientId:string;
    clientSecret:string;
    redirectUris:string[];
    grants:string[];

    //clé étrangères
    userId:ForeignKey<UserPermInterface['id']>;

    //objets de Eagger Logging
    user?:NonAttribute<UserPermInterface>|undefined;
    image?:NonAttribute<string>|undefined;
    authCodes?:NonAttribute<AuthorizationCodeInterface[]>|undefined;
    infoClient?:NonAttribute<InfoClientInterface> | undefined;
    tokens?:NonAttribute<TokenInterface[] >| undefined;

    //fonction de Lazy Logging
    getUser:BelongsToGetAssociationMixin<UserPermInterface>;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
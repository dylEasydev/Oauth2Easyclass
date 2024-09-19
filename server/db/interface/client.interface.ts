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
 * Interface d'un client ( représentation d'une application utilisant notre
 * service d'authentifiaction ).
 */
export interface ClientInterface extends Model<
    InferAttributes<ClientInterface>,
    InferCreationAttributes<ClientInterface>
>{
    id:CreationOptional<number>;
    clientId:string;
    clientSecret:string;
    /**
     * ensembles des url de redirectons de ce client
     */
    redirectUris:string[];
    /**
     * tableaus des octrois autoriser à ce clients
     * 3 valeur pour un autoriser pr un grant soit 'password' soit ,'refresh_token' soit ,'authorization_code' 
     */
    grants:string[];

    //foreignKey
    userId:ForeignKey<UserPermInterface['id']>;

    //objets de eagger logging
    user?:NonAttribute<UserPermInterface>|undefined;
    image?:NonAttribute<string>|undefined;
    authCodes?:NonAttribute<AuthorizationCodeInterface[]>|undefined;
    infoClient?:NonAttribute<InfoClientInterface> | undefined;
    tokens?:NonAttribute<TokenInterface[] >| undefined;

  
    getUser:BelongsToGetAssociationMixin<UserPermInterface>;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
import { 
    Model,InferAttributes, InferCreationAttributes,
    ForeignKey, NonAttribute, CreationOptional
} from 'sequelize';
import { 
    AuthorizationCodeInterface,InfoClientInterface,
    TokenInterface, UserPermInterface 
} from '../interface';
import { BelongsToGetAssociationMixin } from 'sequelize';


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


    userId:ForeignKey<UserPermInterface['id']>;


    user?:NonAttribute<UserPermInterface>|undefined;
    image?:NonAttribute<string>|undefined;
    authCodes?:NonAttribute<AuthorizationCodeInterface[]>|undefined;
    infoClient?:NonAttribute<InfoClientInterface> | undefined;
    tokens?:NonAttribute<TokenInterface[] >| undefined;

    /**
     * @param {BelongsToGetAssociationMixinOptions} options
     * @returns {Promise<UserPermInterface>}
     */
    getUser:BelongsToGetAssociationMixin<UserPermInterface>;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
import { 
    ForeignKey, Model, NonAttribute,CreationOptional,
    InferAttributes, InferCreationAttributes 
} from 'sequelize';
import { UserPermInterface,ClientInterface } from '../interface';

/**
 * Interface du jeton d'authentification associer à un utilisateur 
 * et au client initiant la requête .
 */
export interface TokenInterface extends Model<
    InferAttributes<TokenInterface>,
    InferCreationAttributes<TokenInterface>
>{

    id:CreationOptional<number>;
    accessToken:string;
    accessTokenExpiresAt:Date;
    refreshToken:string;
    refreshTokenExpiresAt:Date;
    scope:string[];

    //foreignKey ( clés étrangères).
    userId: ForeignKey<UserPermInterface['id']>
    clientId:ForeignKey<ClientInterface['id']>;

    //objets de eagger logging(chargement impatient). ref :<<sequelize doc>>
    user?:NonAttribute<UserPermInterface>|undefined;
    client?:NonAttribute<ClientInterface>|undefined;


    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
import { 
    ForeignKey, Model, NonAttribute,CreationOptional,
    InferAttributes, InferCreationAttributes 
} from 'sequelize';
import { UserPermInterface,ClientInterface } from '../interface';

/**
 * Interface du token de rafraichissement ,en cas d'expiration
 * du jeton d'access 
 */
export interface RefreshToken extends Model<
    InferAttributes<RefreshToken>,
    InferCreationAttributes<RefreshToken>
>{

    id:CreationOptional<number>;
    refreshToken:string;
    refreshTokenExpiresAt:Date;
    scope:string[];

    //foreignKey
    userId: ForeignKey<UserPermInterface['id']>
    clientId:ForeignKey<ClientInterface['id']>;

    //objets de eagger logging
    user?:NonAttribute<UserPermInterface>|undefined;
    client?:NonAttribute<ClientInterface>|undefined;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
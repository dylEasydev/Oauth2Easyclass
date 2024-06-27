import { 
    ForeignKey, Model, NonAttribute,CreationOptional,
    InferAttributes, InferCreationAttributes 
} from 'sequelize';
import { UserPermInterface,ClientInterface } from '../interface';


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

    userId: ForeignKey<UserPermInterface['id']>
    clientId:ForeignKey<ClientInterface['id']>;

    user?:NonAttribute<UserPermInterface>|undefined;
    client?:NonAttribute<ClientInterface>|undefined;


    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
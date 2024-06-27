import { 
    ForeignKey, Model, NonAttribute,CreationOptional,
    InferAttributes, InferCreationAttributes 
} from 'sequelize';
import { UserPermInterface,ClientInterface } from '../interface';


export interface RefreshToken extends Model<
    InferAttributes<RefreshToken>,
    InferCreationAttributes<RefreshToken>
>{

    id:CreationOptional<number>;
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
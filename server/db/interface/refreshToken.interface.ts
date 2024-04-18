import { 
    ForeignKey, Model, NonAttribute,CreationOptional,
    InferAttributes, InferCreationAttributes 
} from 'sequelize';
import { UserPermInterface,ClientInterface } from '../interface';

/*
    Cette interface ne sera pas implementer elle represente juste le type Virtuel
    refreshToken
*/
export interface RefreshToken extends Model<
    InferAttributes<RefreshToken>,
    InferCreationAttributes<RefreshToken>
>{
    //attributs de base de l'interface
    id:CreationOptional<number>;
    refreshToken:string;
    refreshTokenExpiresAt:Date;
    scope:string[];

    //clé  étrangère avec d'autres models
    userId: ForeignKey<UserPermInterface['id']>
    clientId:ForeignKey<ClientInterface['id']>;

    //objet de eagger  logging
    user?:NonAttribute<UserPermInterface>|undefined;
    client?:NonAttribute<ClientInterface>|undefined;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
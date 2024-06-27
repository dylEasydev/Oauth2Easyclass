import { 
    ForeignKey, Model, NonAttribute,CreationOptional, InferAttributes, 
    InferCreationAttributes 
} from 'sequelize';
import { UserPermInterface,ClientInterface } from '../interface';


export interface AccessToken extends Model<
    InferAttributes<AccessToken>,
    InferCreationAttributes<AccessToken>
>{
    
    id:CreationOptional<number>;
    accessToken:string;
    accessTokenExpiresAt:Date;
    
    //tableau des permissions qu'octroi ce token 
    scope:string[];

    
    userId: ForeignKey<UserPermInterface['id']>
    clientId:ForeignKey<ClientInterface['id']>;

    user?:NonAttribute<UserPermInterface>|undefined;
    client?:NonAttribute<ClientInterface>|undefined;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
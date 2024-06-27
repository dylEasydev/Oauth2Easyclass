import { 
    InferAttributes, InferCreationAttributes, Model,CreationOptional, 
    ForeignKey,NonAttribute,Association
} from 'sequelize';
import { ClientInterface, TokenInterface, UserPermInterface } from '../interface';

export class Token extends Model<
    InferAttributes<Token>,
    InferCreationAttributes<Token>
> implements TokenInterface{
  
    declare id: CreationOptional<number>;
    declare accessToken: string;
    declare accessTokenExpiresAt: Date;
    declare refreshToken: string;
    declare refreshTokenExpiresAt: Date;
    /**
     * tableau des permissions qu'octroi ce token 
     */
    declare scope: string[];


    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    declare userId: ForeignKey<UserPermInterface['id']>;
    declare clientId: ForeignKey<ClientInterface['id']>;
    
    declare user?: NonAttribute<UserPermInterface>|undefined; 
    declare client?: NonAttribute<ClientInterface> | undefined;

    //alias associations
    declare static associations: { 
        user: Association<TokenInterface, UserPermInterface>;
        client: Association<TokenInterface , ClientInterface>; 
    };
}
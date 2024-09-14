import { 
    InferAttributes, InferCreationAttributes, Model,CreationOptional, 
    ForeignKey,NonAttribute,Association
} from 'sequelize';
import { ClientInterface, TokenInterface, UserPermInterface } from '../interface';

/**
 *  Models de jeton d'accès au ressources d'easy class .
 */
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

    //timesTamps
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    //foreignKey
    declare userId: ForeignKey<UserPermInterface['id']>;
    declare clientId: ForeignKey<ClientInterface['id']>;
    
    //objets de eagger logging
    declare user?: NonAttribute<UserPermInterface>|undefined; 
    declare client?: NonAttribute<ClientInterface> | undefined;

    //alias d'associations
    declare static associations: { 
        user: Association<TokenInterface, UserPermInterface>;
        client: Association<TokenInterface , ClientInterface>; 
    };
}
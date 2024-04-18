import { 
    InferAttributes, InferCreationAttributes, Model,CreationOptional,
    ForeignKey,Association,NonAttribute
} from 'sequelize';
import { 
    AuthorizationCodeInterface, ClientInterface, UserPermInterface 
} from '../interface';

/**
 * models de code d'authorization
 */
export class AuthorizationCode extends Model<
    InferAttributes<AuthorizationCode>,
    InferCreationAttributes<AuthorizationCode>
> implements AuthorizationCodeInterface{
    //attributs du models
    declare id:CreationOptional<number>;
    declare authorizationCode: string;
    declare expiresAt: Date; // data expiration de l'authorization code.
    declare scope: string[];// permissions
    declare redirectUri: string;// url de redirection
    declare codeChallenge?: CreationOptional<string>;
    declare codeChallengeMethod?:CreationOptional<string>;


    //timestamps
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    //cle etrangère
    declare userId: ForeignKey<UserPermInterface['id']>
    declare clientId: ForeignKey<ClientInterface['id']>;

    //objet de eager logging
    declare user?: NonAttribute<UserPermInterface>| undefined;
    declare client?: NonAttribute<ClientInterface> | undefined;

    //declaration des associations
    declare static associations: { 
        user: Association<AuthorizationCodeInterface,UserPermInterface >; 
        client: Association<AuthorizationCodeInterface,ClientInterface>
    };
}
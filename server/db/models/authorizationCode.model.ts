import { 
    InferAttributes, InferCreationAttributes, Model,CreationOptional,
    ForeignKey,Association,NonAttribute
} from 'sequelize';
import { 
    AuthorizationCodeInterface, ClientInterface, UserPermInterface 
} from '../interface';

export class AuthorizationCode extends Model<
    InferAttributes<AuthorizationCode>,
    InferCreationAttributes<AuthorizationCode>
> implements AuthorizationCodeInterface{

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

    //foreignKey
    declare userId: ForeignKey<UserPermInterface['id']>
    declare clientId: ForeignKey<ClientInterface['id']>;

    //objets de eagger logging
    declare user?: NonAttribute<UserPermInterface>| undefined;
    declare client?: NonAttribute<ClientInterface> | undefined;

    //alias d'aasociations
    declare static associations: { 
        user: Association<AuthorizationCodeInterface,UserPermInterface >; 
        client: Association<AuthorizationCodeInterface,ClientInterface>
    };
}
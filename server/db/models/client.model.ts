import { 
    InferAttributes, InferCreationAttributes, Model,CreationOptional,
    ForeignKey,NonAttribute,Association,BelongsToGetAssociationMixin
} from 'sequelize';
import { 
    AuthorizationCodeInterface, ClientInterface, ImageInterface,
    InfoClientInterface, UserPermInterface 
} from '../interface';

/**
 * 
 * models du clients 
 */
export class Client extends Model<
    InferAttributes<Client>,
    InferCreationAttributes<Client>
> implements ClientInterface{
    //attributs du models
    declare id: CreationOptional<number>;
    declare clientId: string;
    declare clientSecret: string;
    declare redirectUris: string[];
    declare grants: string[];

    //timestamps
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    // clé étrangère dees associations de clients
    declare userId: ForeignKey<UserPermInterface['id']>;

    //object  de recuperation d'utilisateur lors du earger Logging
    declare user?: NonAttribute<UserPermInterface> |undefined;
    declare authCodes?: NonAttribute<AuthorizationCodeInterface[]> | undefined;
    declare images?: NonAttribute<ImageInterface> | undefined;
    declare infoClient?: NonAttribute<InfoClientInterface> | undefined;

    //fonctions de Mixins
    declare getUser:BelongsToGetAssociationMixin<UserPermInterface>;
    
    //alias des asssociations
    static associations: { 
        user: Association<ClientInterface, UserPermInterface>; 
        authCodes: Association<ClientInterface,AuthorizationCodeInterface>;
        infoClient: Association<ClientInterface,InfoClientInterface>;
    };
}
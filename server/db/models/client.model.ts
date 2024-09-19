import { 
    InferAttributes, InferCreationAttributes, Model,CreationOptional,
    ForeignKey,NonAttribute,Association,BelongsToGetAssociationMixin
} from 'sequelize';
import { 
    AuthorizationCodeInterface, ClientInterface, ImageInterface,
    InfoClientInterface, UserPermInterface 
} from '../interface';

export class Client extends Model<
    InferAttributes<Client>,
    InferCreationAttributes<Client>
> implements ClientInterface{

    declare id: CreationOptional<number>;
    declare clientId: string;
    declare clientSecret: string;
    declare redirectUris: string[];
    declare grants: string[];

    //timestamps
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    declare userId: ForeignKey<UserPermInterface['id']>;

    //objets de eagger logging
    declare user?: NonAttribute<UserPermInterface> |undefined;
    declare authCodes?: NonAttribute<AuthorizationCodeInterface[]> | undefined;
    declare images?: NonAttribute<ImageInterface> | undefined;
    declare infoClient?: NonAttribute<InfoClientInterface> | undefined;

    //Methodes de Mixins 
    declare getUser:BelongsToGetAssociationMixin<UserPermInterface>;
    
    //alias des asssociations
    static associations: { 
        user: Association<ClientInterface, UserPermInterface>; 
        authCodes: Association<ClientInterface,AuthorizationCodeInterface>;
        infoClient: Association<ClientInterface,InfoClientInterface>;
    };
}
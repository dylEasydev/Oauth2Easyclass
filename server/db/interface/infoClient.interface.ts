import { 
    CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes,
    Model,NonAttribute
} from 'sequelize';
import { ClientInterface } from '../interface';

/**
 * Interface des informations relatives à un client
 * loggo ,nom , type ...
 */
export interface InfoClientInterface extends Model<
    InferAttributes<InfoClientInterface>,
    InferCreationAttributes<InfoClientInterface>
>{

    id:CreationOptional<number>;
    nameOrganization:string;
    /**
     * 3 valeurs possible desktop application , web application ou mobile apllication
     */
    typeApplication:string;
    addressOrganization:string;

    //foreignKey
    clienId:ForeignKey<ClientInterface['id']>;

    //objets de eagger logging
    client?:NonAttribute<ClientInterface>|undefined;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
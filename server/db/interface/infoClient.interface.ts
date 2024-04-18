import { 
    CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes,
    Model,NonAttribute
} from 'sequelize';
import { ClientInterface } from '../interface';

/**
 * interface des informations sur l'organisation d'un client
 */
export interface InfoClientInterface extends Model<
    InferAttributes<InfoClientInterface>,
    InferCreationAttributes<InfoClientInterface>
>{
    //attributs de base de l'interface
    id:CreationOptional<number>;
    nameOrganization:string;
    typeApplication:string;
    addressOrganization:string;

    //clés etrangères
    clienId:ForeignKey<ClientInterface['id']>;

    //objets de eagger logging
    client?:NonAttribute<ClientInterface>|undefined;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
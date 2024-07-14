import { 
    CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes,
    Model,NonAttribute
} from 'sequelize';
import { ClientInterface } from '../interface';

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

    clienId:ForeignKey<ClientInterface['id']>;

    client?:NonAttribute<ClientInterface>|undefined;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
import { 
    InferAttributes, InferCreationAttributes, Model,
    CreationOptional,ForeignKey,NonAttribute,Association
} from 'sequelize';
import { ClientInterface, InfoClientInterface } from '../interface';

/*
    models des informations d'un client
*/
export class InfoClient extends Model<
    InferAttributes<InfoClient>,
    InferCreationAttributes<InfoClient>
> implements InfoClientInterface{
    //attributs du models
    declare id:CreationOptional<number>;
    declare nameOrganization:string;
    declare typeApplication:string;
    declare addressOrganization:string;
    //timestamps
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    //clé étrangère
    declare clienId: ForeignKey<ClientInterface['id']>;

    //object de Eager Logging
    declare client?: NonAttribute<ClientInterface>| undefined;

    //alias associations 
    declare static associations:{
        client: Association<InfoClientInterface , ClientInterface>;
    }
}
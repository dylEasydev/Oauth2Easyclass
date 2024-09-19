import { 
    InferAttributes, InferCreationAttributes, Model,
    CreationOptional,ForeignKey,NonAttribute,Association
} from 'sequelize';
import { ClientInterface, InfoClientInterface } from '../interface';

/**
 * Models des informations associer à un client 
 * loggo , type , ...
 */
export class InfoClient extends Model<
    InferAttributes<InfoClient>,
    InferCreationAttributes<InfoClient>
> implements InfoClientInterface{
  
    declare id:CreationOptional<number>;
    declare nameOrganization:string;
    declare typeApplication:string;
    declare addressOrganization:string;
  
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    //foreignKey
    declare clienId: ForeignKey<ClientInterface['id']>;
  
    //objets de eagger logging (chargement impatient ). ref (doc sequelize)
    declare client?: NonAttribute<ClientInterface>| undefined;

    //alias d'associations 
    declare static associations:{
        client: Association<InfoClientInterface , ClientInterface>;
    }
}
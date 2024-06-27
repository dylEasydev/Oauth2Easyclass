import { 
    InferAttributes, InferCreationAttributes, Model,
    CreationOptional,ForeignKey,NonAttribute,Association
} from 'sequelize';
import { ClientInterface, InfoClientInterface } from '../interface';


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

    declare clienId: ForeignKey<ClientInterface['id']>;
  
    declare client?: NonAttribute<ClientInterface>| undefined;

    declare static associations:{
        client: Association<InfoClientInterface , ClientInterface>;
    }
}
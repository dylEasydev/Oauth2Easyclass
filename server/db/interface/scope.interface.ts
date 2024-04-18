import { 
    Model, NonAttribute ,CreationOptional, InferAttributes,
    InferCreationAttributes
} from 'sequelize';
import { RoleInterface } from './role.interface';

/*
    interface des scope (permissions) qu'à droit chaque utilisateur
    en fonction de son Role
*/
export interface ScopeInterface extends Model<
    InferAttributes<ScopeInterface>,
    InferCreationAttributes<ScopeInterface>
>{
    //attributs de base de l'interface 
    id:CreationOptional<number>;
    scopeName:string;
    scopeDescript:CreationOptional<string>;
    
    //objets de eagger logging de ses associations avec les autres Models
    roles?: NonAttribute<RoleInterface[]>|undefined;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
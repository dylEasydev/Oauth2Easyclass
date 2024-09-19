import { 
    Model, NonAttribute ,CreationOptional, InferAttributes,
    InferCreationAttributes
} from 'sequelize';
import { RoleInterface } from './role.interface';

/**
 * Interface des permissions octroyées à un utilisateur .
 */
export interface ScopeInterface extends Model<
    InferAttributes<ScopeInterface>,
    InferCreationAttributes<ScopeInterface>
>{

    id:CreationOptional<number>;
    scopeName:string;
    scopeDescript:CreationOptional<string>;
    
    //objets de eagger logging
    roles?: NonAttribute<RoleInterface[]>|undefined;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
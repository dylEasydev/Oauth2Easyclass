import { 
    InferAttributes, Model,InferCreationAttributes,
    CreationOptional,NonAttribute,Association
} from 'sequelize';
import { RoleInterface, ScopeInterface } from '../interface';

/**
 * classe des permission des utilisateur 
 */
export class Scope extends Model<
    InferAttributes<Scope>,
    InferCreationAttributes<Scope>
>implements ScopeInterface{
    //attributs du  model
    declare id: CreationOptional<number>;
    declare scopeName: string;
    declare scopeDescript: CreationOptional<string>;
    
    //timestamps
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    //objet de eagger logging
    declare roles?: NonAttribute<RoleInterface[]>| undefined;

    //alias associations
    declare static associtions:{
        roles: Association<ScopeInterface , RoleInterface>;
    }
}
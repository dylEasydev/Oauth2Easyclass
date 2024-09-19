import { 
    InferAttributes, Model,InferCreationAttributes,
    CreationOptional,NonAttribute,Association
} from 'sequelize';
import { RoleInterface, ScopeInterface } from '../interface';

/**
 * Models des permissions d'un utilisateur
 */
export class Scope extends Model<
    InferAttributes<Scope>,
    InferCreationAttributes<Scope>
>implements ScopeInterface{

    declare id: CreationOptional<number>;
    declare scopeName: string;
    declare scopeDescript: CreationOptional<string>;
    
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    //objets de eagger logging
    declare roles?: NonAttribute<RoleInterface[]>| undefined;

    //alias d'associations
    declare static associtions:{
        roles: Association<ScopeInterface , RoleInterface>;
    }
}
import {
    InferAttributes, InferCreationAttributes, Model,
    CreationOptional,ForeignKey, NonAttribute, Association
} from 'sequelize';
import { 
    AuthPermissionInterface, RoleInterface, ScopeInterface 
} from '../interface';

/**
 * models de jointure entre role et scope.
 */

export class AuthPermission extends Model<
    InferAttributes<AuthPermission>,
    InferCreationAttributes<AuthPermission>
> implements AuthPermissionInterface{
    //attributs du models
    declare id: CreationOptional<number>;
    declare roleId: ForeignKey<RoleInterface['id']>;
    declare scopeId: ForeignKey<ScopeInterface['id']>;

    //timestamps
    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;

    //object de eagger logging
    declare scope?: NonAttribute<ScopeInterface> | undefined;
    declare role?: NonAttribute<RoleInterface> | undefined;

    //alias des associations
    declare static associations:{
        scope: Association<AuthPermissionInterface,ScopeInterface>;
        role: Association<AuthPermissionInterface,RoleInterface>;
    }
}
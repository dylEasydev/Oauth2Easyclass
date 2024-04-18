import { 
    ForeignKey, InferAttributes, InferCreationAttributes, Model,
    CreationOptional,NonAttribute
} from 'sequelize';
import { RoleInterface,ScopeInterface } from '../interface';

/**
 * interface de la table de jointure des association entre un 
 * Role et ses Permissions
 */
export interface AuthPermissionInterface extends Model<
    InferAttributes<AuthPermissionInterface>,
    InferCreationAttributes<AuthPermissionInterface>
>{
    //attributs de base de l'interface 
    id:CreationOptional<number>;
    
    //clés étrangère
    roleId:ForeignKey<RoleInterface['id']>;
    scopeId:ForeignKey<ScopeInterface['id']>;

    //objets de Eagger logging
    scope?:NonAttribute<ScopeInterface>|undefined;
    role?:NonAttribute<RoleInterface>|undefined;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
import { 
    ForeignKey, InferAttributes, InferCreationAttributes, Model,
    CreationOptional,NonAttribute
} from 'sequelize';
import { RoleInterface,ScopeInterface } from '../interface';


//Interface de jointures d'associations entre role et scope 
export interface AuthPermissionInterface extends Model<
    InferAttributes<AuthPermissionInterface>,
    InferCreationAttributes<AuthPermissionInterface>
>{
    id:CreationOptional<number>;
    
    //foreignKey
    roleId:ForeignKey<RoleInterface['id']>;
    scopeId:ForeignKey<ScopeInterface['id']>;
    
    //objets de eagger logging
    scope?:NonAttribute<ScopeInterface>|undefined;
    role?:NonAttribute<RoleInterface>|undefined;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
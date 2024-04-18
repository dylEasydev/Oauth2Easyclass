import { 
    Model , CreationOptional, InferAttributes,InferCreationAttributes,
    NonAttribute, ForeignKey, Transaction
} from 'sequelize';
import { ScopeInterface, UserPermInterface } from '../interface';

/**
 * interface des Role des utilisateur (Adiministrateur , étudiant ,enseignants,...)
 */
export interface RoleInterface extends Model<
    InferAttributes<RoleInterface>,
    InferCreationAttributes<RoleInterface>
>{
    //attributs de base de l'interface 
    id:CreationOptional<number>;
    roleName:string;
    roleDescript:CreationOptional<string>;

    //clés etrangère de l'interface
    userId:ForeignKey<UserPermInterface['id']>;

    //objets de eagger logging
    user?:NonAttribute<UserPermInterface>|undefined;
    scopes?:NonAttribute<ScopeInterface[]>|undefined;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;

    //méthodes Mixins
    addListScope(t?:Transaction|null):Promise<void>;
}
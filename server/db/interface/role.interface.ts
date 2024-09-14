import { 
    Model , CreationOptional, InferAttributes,InferCreationAttributes,
    NonAttribute, ForeignKey, Transaction
} from 'sequelize';
import { ScopeInterface, UserPermInterface } from '../interface';

/**
 * Interface des rôles associer à un utilisateurs
 */
export interface RoleInterface extends Model<
    InferAttributes<RoleInterface>,
    InferCreationAttributes<RoleInterface>
>{

    id:CreationOptional<number>;
    /**
     * 3 valeur possible 'admin' , 'teacher' ,'student' ... Bientôt 'premium'
     */
    roleName:string;
    roleDescript:CreationOptional<string>;

    //foreignKey
    userId:ForeignKey<UserPermInterface['id']>;

    //objets de eagger logging
    user?:NonAttribute<UserPermInterface>|undefined;
    scopes?:NonAttribute<ScopeInterface[]>|undefined;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;

    /**
     * Permet d'associer les permisons correspondants à ce rôle
     */
    addListScope(t?:Transaction|null):Promise<void>;
}
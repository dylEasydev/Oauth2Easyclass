import { 
    Model , CreationOptional, InferAttributes,InferCreationAttributes,
    NonAttribute, ForeignKey, Transaction
} from 'sequelize';
import { ScopeInterface, UserPermInterface } from '../interface';


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

    userId:ForeignKey<UserPermInterface['id']>;

    user?:NonAttribute<UserPermInterface>|undefined;
    scopes?:NonAttribute<ScopeInterface[]>|undefined;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;

    /**
     * permet d'associer les permisons correspondants à ce role
     * @param t 
     * 
     */
    addListScope(t?:Transaction|null):Promise<void>;
}
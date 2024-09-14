import { 
    Model,CreationOptional,InferAttributes , 
    InferCreationAttributes, FindOptions 
} from 'sequelize';
import { 
    UserBaseInterface ,UserPermInterface ,UserTempInterface
} from '../interface';

/**
 * Interface des codes de verification associer à des utilisateurs 
 * permanents et temporaires .
 */
export interface CodeVerifInterface extends Model<
    InferAttributes<CodeVerifInterface>,
    InferCreationAttributes<CodeVerifInterface>
>{

    id:CreationOptional<number>;
    codeverif:number;
    expiresAt:Date;
    nameTable:CreationOptional<string>;

    //foreignKey
    foreignId:CreationOptional<number>;

    //definition d'une clé pour la reconnaisances par typescript
    [key: string]: (
        (options?: FindOptions<
            InferAttributes<UserBaseInterface>    
        >) => Promise<UserBaseInterface>
    )|any;
    
    getTeacherTemp(
        options?:FindOptions<UserTempInterface>
    ):Promise<UserTempInterface|null>;

    getStudentTemp(
        options?:FindOptions<UserTempInterface>
    ):Promise<UserTempInterface|null>;

    getUser(
        options?:FindOptions<UserPermInterface>
    ):Promise<UserPermInterface|null>;

    //récupération de l'objet associer à ce code de verification
    getForeignObject(
        options?:FindOptions<InferAttributes<UserBaseInterface>>
    ):Promise<UserBaseInterface|null>;
    
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
import { 
    Model,CreationOptional,InferAttributes , 
    InferCreationAttributes, FindOptions 
} from 'sequelize';
import { 
    UserBaseInterface ,UserPermInterface ,UserTempInterface
} from '../interface';

/**
 * interface représentant un code de verification
 */
export interface CodeVerifInterface extends Model<
    InferAttributes<CodeVerifInterface>,
    InferCreationAttributes<CodeVerifInterface>
>{
    //attributs de base
    id:CreationOptional<number>;
    codeverif:number;
    expiresAt:Date;
    nameTable:CreationOptional<string>;

    //clés etrangères
    foreignId:CreationOptional<number>;

    //fonction de lazy logging des associations ploymorphes de l'ineterface
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

    getForeignObject(
        options?:FindOptions<InferAttributes<UserBaseInterface>>
    ):Promise<UserBaseInterface|null>;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
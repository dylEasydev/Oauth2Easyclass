import { 
    CreationOptional, InferAttributes, InferCreationAttributes,
    Model, NonAttribute, Optional
} from 'sequelize';
import { CodeVerifInterface} from '../interface';
import { CreateOptions } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';

//interface de Base des utilisateurs
export interface UserBaseInterface extends Model<
    InferAttributes<UserBaseInterface>,
    InferCreationAttributes<UserBaseInterface>
>{
    //attributs de  base d'un utilisateur
    id:CreationOptional<number>;
    userName:string;
    password:string;
    addressMail:string;
    
    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;

    //eager Logging objets
    codeVerif?:NonAttribute<number> |undefined;

    //methodes de mixins
    createCodeVerif(
        value:Optional<
            InferCreationAttributes<CodeVerifInterface>,
            NullishPropertiesOf<CodeVerifInterface>
        >,
        options?:CreateOptions<InferAttributes<CodeVerifInterface>>
    ):Promise<CodeVerifInterface>;

}
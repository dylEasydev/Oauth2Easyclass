import { 
    CreationOptional, InferAttributes, InferCreationAttributes,
    Model, NonAttribute, Optional
} from 'sequelize';
import { CodeVerifInterface} from '../interface';
import { CreateOptions } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';

//Interface de base d'un utilisateur permanent ou temporaire . 
export interface UserBaseInterface extends Model<
    InferAttributes<UserBaseInterface>,
    InferCreationAttributes<UserBaseInterface>
>{

    id:CreationOptional<number>;
    userName:string;
    password:string;
    addressMail:string;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;

    codeVerif?:NonAttribute<number> |undefined;
    /**
     * Crée un code de vérification associer à cette utilisateur 
     */
    createCodeVerif(
        value:Optional<
            InferCreationAttributes<CodeVerifInterface>,
            NullishPropertiesOf<CodeVerifInterface>
        >,
        options?:CreateOptions<InferAttributes<CodeVerifInterface>>
    ):Promise<CodeVerifInterface>;

}
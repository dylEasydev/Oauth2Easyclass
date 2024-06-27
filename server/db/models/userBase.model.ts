import {
    InferAttributes, InferCreationAttributes, Model,CreateOptions,
    Optional,CreationOptional,NonAttribute
} from 'sequelize';
import { UserBaseInterface, CodeVerifInterface } from '../interface';
import { NullishPropertiesOf } from 'sequelize/types/utils';

export abstract class UserBase extends Model implements UserBaseInterface{

    declare id: CreationOptional<number>;
    declare userName: string;
    declare password: string;
    declare addressMail: string;
    
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
    
    declare codeVerif?: NonAttribute<number> | undefined;
    
    /**
     * 
     * @param value 
     * @param options 
     */
    abstract createCodeVerif(
        value:Optional<
            InferCreationAttributes<
                CodeVerifInterface>,
                NullishPropertiesOf<CodeVerifInterface>
            >,
        options?:CreateOptions<InferAttributes<CodeVerifInterface>>
    ):Promise<CodeVerifInterface>;
}
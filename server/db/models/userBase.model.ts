import {
    InferAttributes, InferCreationAttributes, Model,CreateOptions,
    Optional,CreationOptional,NonAttribute
} from 'sequelize';
import { UserBaseInterface, CodeVerifInterface } from '../interface';
import { NullishPropertiesOf } from 'sequelize/types/utils';

export abstract class UserBase extends Model implements UserBaseInterface{
        //attributs du models
        declare id: CreationOptional<number>;
        declare userName: string;
        declare password: string;
        declare addressMail: string;
    
        //timestamps
        declare readonly createdAt: CreationOptional<Date>;
        declare readonly deletedAt: CreationOptional<Date>;
        declare readonly updatedAt: CreationOptional<Date>;
    
        //declaration des objet du eagger logging
        declare codeVerif?: NonAttribute<number> | undefined;
    
        //Methodes mixins
        abstract createCodeVerif(
            value:Optional<
                InferCreationAttributes<
                    CodeVerifInterface>,
                    NullishPropertiesOf<CodeVerifInterface>
                >,
            options?:CreateOptions<InferAttributes<CodeVerifInterface>>
        ):Promise<CodeVerifInterface>;
}
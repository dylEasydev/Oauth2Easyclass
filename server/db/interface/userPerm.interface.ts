import { 
    CreateOptions, HasOneCreateAssociationMixin, InferAttributes, 
    InferCreationAttributes, NonAttribute, Optional 
} from 'sequelize';
import { 
    UserBaseInterface ,ClientInterface, TokenInterface, ImageInterface,
    AuthorizationCodeInterface,RoleInterface
} from '../interface';
import { NullishPropertiesOf } from 'sequelize/types/utils';


export interface UserPermInterface extends UserBaseInterface{
    
    clients?:NonAttribute<ClientInterface[]>|undefined;
    tokens?:NonAttribute<TokenInterface[]>|undefined;
    authCodes?:NonAttribute<AuthorizationCodeInterface[]>|undefined;
    image?:NonAttribute<string>|undefined;
    role?:NonAttribute<RoleInterface>|undefined; 

    /**
     * 
     * @param value 
     * @param options 
     */
    createImage(
        value?:Optional<
            InferCreationAttributes<ImageInterface>,
            NullishPropertiesOf<ImageInterface>
        >,
        options?:CreateOptions<InferAttributes<ImageInterface>>
    ):Promise<ImageInterface>;
    createRole:HasOneCreateAssociationMixin<RoleInterface>;
}
import { 
    CreateOptions, HasOneCreateAssociationMixin, InferAttributes, 
    InferCreationAttributes, NonAttribute, Optional 
} from 'sequelize';
import { 
    UserBaseInterface ,ClientInterface, TokenInterface, ImageInterface,
    AuthorizationCodeInterface,RoleInterface
} from '../interface';
import { NullishPropertiesOf } from 'sequelize/types/utils';

/*
    interface des utilisateurs ayant déjà fait  la verification par mail
    ,elle hérite de l'interface de base des utilisateurs
*/
export interface UserPermInterface extends UserBaseInterface{
    
    //objets de eagger logging de l'interface des utilisateurs Permanents
    clients?:NonAttribute<ClientInterface[]>|undefined;
    tokens?:NonAttribute<TokenInterface[]>|undefined;
    authCodes?:NonAttribute<AuthorizationCodeInterface[]>|undefined;
    image?:NonAttribute<string>|undefined;
    role?:NonAttribute<RoleInterface>|undefined; 

    //Methodes de mixins 
    createImage(
        value?:Optional<
            InferCreationAttributes<ImageInterface>,
            NullishPropertiesOf<ImageInterface>
        >,
        options?:CreateOptions<InferAttributes<ImageInterface>>
    ):Promise<ImageInterface>;
    createRole:HasOneCreateAssociationMixin<RoleInterface>;
}
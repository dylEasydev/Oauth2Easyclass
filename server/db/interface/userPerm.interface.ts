import { 
    CreateOptions, HasOneCreateAssociationMixin, InferAttributes, 
    InferCreationAttributes, NonAttribute, Optional 
} from 'sequelize';
import { 
    UserBaseInterface ,ClientInterface, TokenInterface, ImageInterface,
    AuthorizationCodeInterface,RoleInterface
} from '../interface';
import { NullishPropertiesOf } from 'sequelize/types/utils';

/**
 * Interface pour les utilisateurs enregistrer ou permanent.
 */
export interface UserPermInterface extends UserBaseInterface{
    
    //objets de eager logging (chargement impatient). ref:<< doc sequelize>>
    clients?:NonAttribute<ClientInterface[]>|undefined;
    tokens?:NonAttribute<TokenInterface[]>|undefined;
    authCodes?:NonAttribute<AuthorizationCodeInterface[]>|undefined;
    image?:NonAttribute<string>|undefined;
    role?:NonAttribute<RoleInterface>|undefined; 

    /**
     * Crée une image associer à cette utilisateur permanent.  
     */
    createImage(
        value?:Optional<
            InferCreationAttributes<ImageInterface>,
            NullishPropertiesOf<ImageInterface>
        >,
        options?:CreateOptions<InferAttributes<ImageInterface>>
    ):Promise<ImageInterface>;

    /**
     * Crée le rôle associer à cette utilisateur . 
    */
    createRole:HasOneCreateAssociationMixin<RoleInterface>;
}
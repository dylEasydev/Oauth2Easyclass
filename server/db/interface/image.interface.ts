import { 
    Model ,CreationOptional, NonAttribute,InferAttributes, 
    InferCreationAttributes,FindOptions
} from 'sequelize';
import { UserPermInterface , ClientInterface} from '../interface';

/**
 * Interface des images associer à un objet (client , user ...) 
 */
export interface ImageInterface extends Model<
    InferAttributes<ImageInterface>,
    InferCreationAttributes<ImageInterface>
>{

    id:CreationOptional<number>;
    picturesName:CreationOptional<string>;
    urlPictures:CreationOptional<string>;
    /**
     * nom de la table associer à cette image exemple
     * 'domain' , 'user' , 'client' ...
     */
    nameTable:CreationOptional<string>;

    //foreignKey
    foreignId:CreationOptional<number>;

    //objets de eagger logging
    foreignData?: NonAttribute<UserPermInterface|ClientInterface> | undefined;

    //definition de clé pour la reconnaissance des fonctions par typescript 
    [key: string]: (
        (options?: FindOptions<
            InferAttributes<
                UserPermInterface|ClientInterface
            >
        >) => Promise<UserPermInterface|ClientInterface>
    )|any;

    getClient(
        options?:FindOptions<InferAttributes<ClientInterface>>
    ):Promise<ClientInterface|null>;
    getUser(
        options?:FindOptions<InferAttributes<UserPermInterface>>
    ):Promise<UserPermInterface|null>;

    //récupération de l'objet associer à cette image (user ou client)
    getForeignObject(
        options?:FindOptions<
            InferAttributes<
                UserPermInterface|ClientInterface
            >
        >
    ):Promise<UserPermInterface|ClientInterface|null>;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
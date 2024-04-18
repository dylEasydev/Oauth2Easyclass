import { 
    Model ,CreationOptional, NonAttribute,InferAttributes, 
    InferCreationAttributes,FindOptions
} from 'sequelize';
import { UserPermInterface , ClientInterface} from '../interface';
/**
 * interface représentant les Images
 */
export interface ImageInterface extends Model<
    InferAttributes<ImageInterface>,
    InferCreationAttributes<ImageInterface>
>{
    //attributs de base
    id:CreationOptional<number>;
    picturesName:CreationOptional<string>;
    urlPictures:CreationOptional<string>;
    nameTable:CreationOptional<string>;

    //clés étrangère
    foreignId:CreationOptional<number>;

    //objets de Eagger logging
    foreignData?: NonAttribute<UserPermInterface|ClientInterface> | undefined;

    //fonction de lazy logging des association polymorphes d'Image
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

    getForeignObject(
        options?:FindOptions<
            InferAttributes<
                UserPermInterface|ClientInterface
            >
        >
    ):Promise<UserPermInterface|ClientInterface|null>;

    //timestamps
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
import { 
    Model ,CreationOptional, NonAttribute,InferAttributes, 
    InferCreationAttributes,FindOptions
} from 'sequelize';
import { UserPermInterface , ClientInterface} from '../interface';


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

    foreignId:CreationOptional<number>;

    foreignData?: NonAttribute<UserPermInterface|ClientInterface> | undefined;


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

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}
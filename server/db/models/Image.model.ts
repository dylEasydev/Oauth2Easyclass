import { 
    CreationOptional, InferAttributes, InferCreationAttributes,
    Model ,NonAttribute, FindOptions
} from 'sequelize';
import { ClientInterface, ImageInterface, UserPermInterface } from '../interface';
import { upperCaseFirst } from '../../helper';
import { Client, User } from '../../db';


export class Image extends Model<
    InferAttributes<Image>,
    InferCreationAttributes<Image>
>implements ImageInterface{
    
    declare id:CreationOptional<number>;
    declare picturesName:CreationOptional<string>;
    declare urlPictures:CreationOptional<string>;
    declare nameTable: CreationOptional<string>;

    //timestamps
    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;

    //clé etrangère 
    declare foreignId: CreationOptional<number>;

    //objet de eagger logging
    declare user?:NonAttribute<UserPermInterface>| undefined;
    declare client?: NonAttribute<ClientInterface> | undefined;
    declare foreignData?: NonAttribute<UserPermInterface | ClientInterface> | undefined;

    //declaration de fonction de mixins
    [key: string]: (
        (options?:FindOptions<
                InferAttributes<UserPermInterface|ClientInterface>
            >) => Promise<
            UserPermInterface|ClientInterface
        >
    )|any;
    getForeignObject(
        options?:FindOptions<
            InferAttributes<UserPermInterface|ClientInterface>
        >
    ):Promise<UserPermInterface|ClientInterface|null>{
        if(!this.nameTable) return Promise.resolve(null);
        const mixinName = `${upperCaseFirst(this.nameTable)}`;
        return this[mixinName](options);
    }

    getClient(
        options?:FindOptions<InferAttributes<ClientInterface>>
    ){
        return new Promise<ClientInterface | null>(async (resolve, reject) => {
            try {
                if(this.nameTable !== 'client') resolve(null);
                else{
                    const client = await Client.findByPk(this.foreignId,options);
                    resolve(client);
                }
            } catch (error) {
                reject(error);
            }
        })
    };

    getUser(
        options?:FindOptions<UserPermInterface>
    ){
        return new Promise<UserPermInterface|null>(async(resolve, reject) => {
            try {
                if(this.nameTable !== 'user') resolve(null);
                else{
                    const user = User.findByPk(this.foreignId,options);
                    resolve(user)
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}
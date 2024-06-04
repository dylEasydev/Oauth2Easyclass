import { Op } from 'sequelize';
import { Client, User,Role} from '../../db';
import sequelizeConnect from '../config';
import { ClientInterface, UserPermInterface } from '../interface';
import { ClientServiceInterface } from './interface';

class ClientService implements ClientServiceInterface{
    findByClientId(clientId: string){
        return new Promise<Client| null>(async(resolve, reject) => {
            try {
                const clientFind = await sequelizeConnect.transaction(async t=>{
                    return await Client.findOne({
                        where:{
                            clientId
                        },
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(`(
                                        SELECT urlPictures FROM image as picture
                                        WHERE 
                                            picture.foreignId = Client.id
                                            AND
                                            picture.nameTable = "client"
                                        LIMIT 1
                                    )`),`image`
                                ]
                            ]
                        },
                        include:[
                            {association:Client.associations.infoClient},
                            {
                                association:Client.associations.user,
                                attributes:{
                                    include:[
                                        [
                                            sequelizeConnect.literal(`(
                                                SELECT urlPictures FROM image as picture
                                                WHERE 
                                                    picture.foreignId = user.id
                                                    AND
                                                    picture.nameTable = "user"
                                                LIMIT 1
                                            )`),`image`
                                        ],
                                        [
                                            sequelizeConnect.literal(`(
                                                SELECT codeverif FROM codeVerif as code
                                                WHERE 
                                                    code.foreignId = user.id
                                                    AND
                                                    code.nameTable = "user"
                                                LIMIT 1
                                            )`),`codeVerif`
                                        ]
                                    ]
                                },
                                include:[
                                    {
                                        association:User.associations.role,
                                        include:[
                                            {
                                                association:Role.associations.scopes,
                                                through:{
                                                    attributes:[]
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    });
                });
                resolve(clientFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    findByClienIdAndClienSecret(clientId:string, clientSecret:string){
        return new Promise<Client| null>(async(resolve, reject) => {
            try {
                const clientFind = await sequelizeConnect.transaction(async t=>{
                    return await Client.findOne({
                        where:{
                            [Op.and]:{
                                clientId:clientId,
                                clientSecret:clientSecret
                            }
                        },
                       attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(`(
                                        SELECT urlPictures FROM image as picture
                                        WHERE 
                                            picture.foreignId = Client.id
                                            AND
                                            picture.nameTable = "client"
                                        LIMIT 1
                                    )`),`image`
                                ]
                            ]
                        },
                        include:[
                            {association:Client.associations.infoClient},
                            {
                                association:Client.associations.user,
                                attributes:{
                                    include:[
                                        [
                                            sequelizeConnect.literal(`(
                                                SELECT urlPictures FROM image as picture
                                                WHERE 
                                                    picture.foreignId = user.id
                                                    AND 
                                                    picture.nameTable = "user"
                                                LIMIT 1
                                            )`),`image`
                                        ],
                                        [
                                            sequelizeConnect.literal(`(
                                                SELECT codeverif FROM codeVerif as code
                                                WHERE 
                                                    code.foreignId = user.id
                                                    AND
                                                    code.nameTable = "user"
                                                LIMIT 1
                                            )`),`codeVerif`
                                        ]
                                    ]
                                },
                                include:[
                                    {
                                        association:User.associations.role,
                                        include:[
                                            {
                                                association:Role.associations.scopes,
                                                through:{
                                                    attributes:[]
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    });
                });
                resolve(clientFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    getUser(client: ClientInterface){
        return new Promise<UserPermInterface>(async(resolve, reject) => {
            try {
                const userFind = await sequelizeConnect.transaction(async t =>{
                    return await client.getUser({
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(`(
                                        SELECT urlPictures FROM image as picture
                                        WHERE 
                                            picture.foreignId = user.id
                                            AND
                                            picture.nametable = "user"
                                        LIMIT
                                    )`),`image`
                                ],
                                [
                                    sequelizeConnect.literal(`(
                                        SELECT codeverif FROM codeVerif as code
                                        WHERE 
                                            code.foreignId = user.id
                                            AND
                                            code.nameTable = "user"
                                        LIMIT 1
                                    )`),`codeVerif`
                                ]
                            ]
                        },
                        include:[
                            {
                                association:User.associations.role,
                                include:[
                                    {
                                        association:Role.associations.scopes,
                                        through:{
                                            attributes:[]
                                        }
                                    }
                                ]
                            }
                        ]
                    });
                });
                resolve(userFind);
            } catch (error) {
                reject(error);
            }
        })
    }
}
const clientservice = new ClientService();
export default  clientservice;
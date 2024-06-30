import { TokenInterfaceService } from "./interface";
import { Token,User,Role,Client} from "../../db";
import sequelizeConnect from "../config";
import { AccessToken, RefreshToken } from "../interface";
import { NotFountError } from "./user.service";

class TokenService implements TokenInterfaceService{

    createToken(token: Token, userId:number, clientId:number){
        return new Promise<Token>(async(resolve, reject) => {
            try {
                const newToken = await sequelizeConnect.transaction(async t=>{
                    return await Token.create({
                        accessToken:token.accessToken,
                        accessTokenExpiresAt:token.accessTokenExpiresAt,
                        refreshToken:token.refreshToken,
                        refreshTokenExpiresAt:token.refreshTokenExpiresAt,
                        userId:userId,
                        clientId:clientId,
                        scope:token.scope
                    });
                });
                resolve(newToken);
            } catch (error) {
                reject(error);
            }
        })
    }

    getTokenByAccessToken(accessToken:string){
        return new Promise<AccessToken|null>(async(resolve, reject) => {
            try {
                const tokenFind = await sequelizeConnect.transaction(async t=>{
                    return await Token.findOne({
                        where:{
                            accessToken
                        },
                        attributes:{
                            exclude:['refreshToken','refreshTokenExpiresAt']
                        },
                        include:[
                            {
                                association:Token.associations.user,
                                attributes:{
                                    include:[
                                        [
                                            sequelizeConnect.literal(
                                                sequelizeConnect.getDialect()!=='postgres'?
                                                `(
                                                SELECT urlPictures FROM image as picture
                                                WHERE 
                                                    picture.foreignId = user.id
                                                    AND
                                                    picture.nameTable = "user"
                                                LIMIT 1
                                            )`:  `(
                                                SELECT "urlPictures" FROM "image"
                                                WHERE 
                                                    "foreignId" = "user"."id"
                                                    AND
                                                    "nameTable" = 'user'
                                                LIMIT 1
                                            )`),`image`
                                        ],
                                        [
                                            sequelizeConnect.literal(
                                                sequelizeConnect.getDialect()!=='postgres'?
                                                `(
                                                SELECT codeverif FROM codeVerif as code
                                                WHERE 
                                                    code.foreignId = user.id
                                                    AND
                                                    code.nameTable = "user"
                                                LIMIT 1
                                            )`:  `(
                                                SELECT "codeverif" FROM "codeVerif"
                                                WHERE 
                                                    "foreignId" = "user"."id"
                                                    AND
                                                    "nameTable" = 'user'
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
                            },
                            {
                                association:Token.associations.client,
                                attributes:{
                                    include:[
                                        [
                                            sequelizeConnect.literal(
                                                sequelizeConnect.getDialect() !== 'postgres'?
                                                `(
                                                SELECT urlPictures FROM image as picture
                                                WHERE 
                                                    picture.foreignId = client.id
                                                    AND
                                                    picture.nameTable = "client"
                                                LIMIT 1
                                            )`: `(
                                                SELECT "urlPictures" FROM "image"
                                                WHERE 
                                                    "foreignId" = "client"."id"
                                                    AND
                                                    "nameTable" = 'client'
                                                LIMIT 1
                                            )`),`image`
                                        ]
                                    ]
                                },
                                include:[
                                    {
                                        association:Client.associations.infoClient
                                    }
                                ]
                            }
                        ]
                    });
                })
                resolve(tokenFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    getTokenByRefreshToken(refreshToken:string){
        return new Promise<RefreshToken|null>(async(resolve, reject) => {
            try {
                const tokenFind = await sequelizeConnect.transaction(async t=>{
                    return await Token.findOne({
                        where:{
                            refreshToken:refreshToken
                        },
                        attributes:{
                            exclude:['accessToken','accessTokenExpiresAt']
                        },
                        include:[
                            {
                                association:Token.associations.user,
                                attributes:{
                                    include:[
                                        [
                                            sequelizeConnect.literal(
                                                sequelizeConnect.getDialect() !== 'postgres'?
                                                `(
                                                SELECT urlPictures FROM image as picture
                                                WHERE 
                                                    picture.foreignId = user.id
                                                    AND
                                                    picture.nameTable = "user"
                                                LIMIT 1
                                            )`:  `(
                                                SELECT "urlPictures" FROM "image"
                                                WHERE 
                                                    "foreignId" = "user"."id"
                                                    AND
                                                    "nameTable" = 'user'
                                                LIMIT 1
                                            )`),`image`
                                        ],
                                        [
                                            sequelizeConnect.literal(
                                                sequelizeConnect.getDialect() !== 'postgres'?
                                                `(
                                                SELECT codeverif FROM codeVerif as code
                                                WHERE 
                                                    code.foreignId = user.id
                                                    AND
                                                    code.nameTable = "user"
                                                LIMIT 1
                                            )`:  `(
                                                SELECT "codeverif" FROM "codeVerif"
                                                WHERE 
                                                    "foreignId" = "user"."id"
                                                    AND
                                                    "nameTable" = 'user'
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
                            },
                            {
                                association:Token.associations.client,
                                attributes:{
                                    include:[
                                        [
                                            sequelizeConnect.literal(
                                                sequelizeConnect.getDialect() !== 'postgres'?
                                                `(
                                                SELECT urlPictures FROM image as picture
                                                WHERE 
                                                    picture.foreignId = client.id
                                                    AND
                                                    picture.nameTable = "client"
                                                LIMIT 1
                                            )`:  `(
                                                SELECT "urlPictures" FROM "image"
                                                WHERE 
                                                    "foreignId" = "client"."id"
                                                    AND
                                                    "nameTable" = 'client'
                                                LIMIT 1
                                            )`),`image`
                                        ]
                                    ]
                                },
                                include:[
                                    {
                                        association:Client.associations.infoClient
                                    }
                                ]
                            }
                        ]
                    });
                })
                resolve(tokenFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteTokenByRefreshToken(refreshToken: string){
        return new Promise<void>(async (resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    const tokenFind = await Token.findOne({where:{refreshToken}});
                    if(tokenFind === null) reject(new NotFountError(`Ce Token n'existe pas`!));
                    else{
                        await Token.destroy({
                            force:true,
                            where:{
                                id:tokenFind.id
                            }
                        });
                        resolve();
                    }
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteTokenByAccessToken(accessToken: string){
        return new Promise<void>(async (resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    const tokenFind = await Token.findOne({where:{accessToken}});
                    if(tokenFind === null) reject(new NotFountError(`Ce Token n'existe pas`!));
                    else{
                        await Token.destroy({
                            force:true,
                            where:{
                                id:tokenFind.id
                            }
                        });
                        resolve();
                    }
                });
            } catch (error) {
                reject(error);
            }
        })
    }
}

const tokenService = new TokenService();
export default tokenService;
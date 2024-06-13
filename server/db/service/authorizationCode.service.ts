import { AuthorizationCode,User,Client,Role} from '../../db';
import sequelizeConnect from '../config';
import { AuthorizationCodeInterface } from '../interface';
import { AuthorizationCodeServiceInterface } from './interface';
import { NotFountError } from './user.service';

class AuthorizationCodeService implements AuthorizationCodeServiceInterface{
    getAuthorizationCode(authorizationCode: string){
        return new Promise<AuthorizationCode|null>(async (resolve, reject) => {
            try {
                const authCode = await sequelizeConnect.transaction(async t=>{
                    return await AuthorizationCode.findOne({
                        where:{
                            authorizationCode
                        },
                        include:[
                            {
                                association:AuthorizationCode.associations.user,
                                attributes:{
                                    include:[
                                        [
                                            sequelizeConnect.literal(
                                                sequelizeConnect.getDialect() !=='postgres'?
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
                                            )`: `(
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
                                association:AuthorizationCode.associations.client,
                                attributes:{
                                    include:[
                                        [
                                            sequelizeConnect.literal(
                                                sequelizeConnect.getDialect() !=='postgres'?
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
                });
                resolve(authCode);
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteAuthCodeByCode(authorizationCode: string){
        return new Promise<void>(async(resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    const authCodeFind = await AuthorizationCode.findOne({
                        where:{authorizationCode}
                    });
                    if(authCodeFind === null) reject(new NotFountError(`Ce code authorization n'existe pas!`));
                    else{
                        await AuthorizationCode.destroy({
                            force:true,
                            where:{
                                id:authCodeFind.id
                            }
                        });
                        resolve();
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    createAuthorizationCode(
        authorizationCode: AuthorizationCodeInterface,
        userId: number, clientId: number
    ): Promise<AuthorizationCodeInterface> {
        return new Promise<AuthorizationCode>(async (resolve, reject) => {
            try {
                const authCode = await sequelizeConnect.transaction(async t=>{
                    return AuthorizationCode.create({
                        authorizationCode:authorizationCode.authorizationCode,
                        expiresAt:authorizationCode.expiresAt,
                        userId:userId,
                        clientId:clientId,
                        scope:authorizationCode.scope,
                        redirectUri:authorizationCode.redirectUri,
                        codeChallenge:authorizationCode.codeChallenge,
                        codeChallengeMethod:authorizationCode.codeChallengeMethod
                    });
                });

                resolve(authCode);
            } catch (error) {
                reject(error);
            }
        })
    }
}
const authorizationCodeService = new AuthorizationCodeService()
export default  authorizationCodeService;
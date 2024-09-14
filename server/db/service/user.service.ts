import sequelizeConnect from '../config';
import { Role, User } from '../../db';
import { UserPermServiceInterface } from './interface';
import * as bcrypt from 'bcryptjs';
import { generateCode } from '../../helper';
import { Op } from 'sequelize';

export class NotFountError extends Error{};
export class PassWordError extends Error{};

class UserService implements UserPermServiceInterface{

    findUserById(id: number){
        return new Promise<User| null>(async (resolve, reject) => {
            try {
                const userFind = await sequelizeConnect.transaction(async t=>{
                    return await User.findByPk(id,{
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(
                                        sequelizeConnect.getDialect() !== 'postgres'?
                                        `(
                                        SELECT urlPictures FROM image as picture
                                        WHERE 
                                            picture.foreignId = User.id
                                            AND
                                            picture.nameTable ="user"
                                        LIMIT 1
                                    )`:  `(
                                        SELECT "urlPictures" FROM "image"
                                        WHERE 
                                            "foreignId" = "User"."id"
                                            AND
                                            "nameTable" ='user'
                                        LIMIT 1
                                    )`),`image`
                                ],
                                [
                                    sequelizeConnect.literal(
                                        sequelizeConnect.getDialect() !== 'postgres'?
                                        `(
                                        SELECT codeverif FROM codeVerif as code
                                        WHERE 
                                            code.foreignId = User.id
                                            AND
                                            code.nameTable = "user"
                                        LIMIT 1
                                    )`:  `(
                                        SELECT "codeverif" FROM "codeVerif"
                                        WHERE 
                                            "foreignId" = "User"."id"
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
                    });
                });
                resolve(userFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    findUserByName(userName?: string , mail?:string){
        return new Promise<User| null>(async(resolve, reject) => {
            try {
                const name = (userName)? userName:' ';
                const email = (mail)? mail:' ';
                const  userFind = await sequelizeConnect.transaction(async t =>{
                    return User.findOne({
                        where:{
                            [Op.or]:[
                                {userName:name},
                                {addressMail:email}
                            ]
                        },
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(
                                        sequelizeConnect.getDialect() !=='postgres'?
                                        `(
                                        SELECT urlPictures FROM image as picture
                                        WHERE 
                                            picture.foreignId = User.id
                                            AND
                                            picture.nameTable = "user"
                                        LIMIT 1
                                    )`:  `(
                                        SELECT "urlPictures" FROM "image"
                                        WHERE 
                                            "foreignId" = "User"."id"
                                            AND
                                            "nameTable" = 'user'
                                        LIMIT 1
                                    )`,),`image`
                                ],
                                [
                                    sequelizeConnect.literal(
                                        sequelizeConnect.getDialect() !== 'postgres'?
                                        `(
                                        SELECT codeverif FROM codeVerif as code
                                        WHERE 
                                            code.foreignId = User.id
                                            AND
                                            code.nameTable = "user"
                                        LIMIT 1
                                    )`:  `(
                                        SELECT "codeverif" FROM "codeVerif"
                                        WHERE 
                                            "foreignId" = "User"."id"
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
                    });
                });
                resolve(userFind);
            } catch (error) {
                reject(error);
            }
        })
    }
    getUserFromPassAndName(userName: string, password: string){
        return new Promise<User>(async (resolve, reject) => {
            try {
                const userFind = await this.findUserByName(userName);
                if(userFind !== null){
                    const test =await bcrypt.compare(password ,userFind.password);
                    if(!test) reject(new PassWordError(`vous avez fournis un mauvais mots de passe !`));
                    else resolve(userFind) 
                }
                reject(new NotFountError(`Aucun utilisateur existant !`))
            } catch (error) {
                reject(error)
            }
        })
    }

    createUser<T extends { 
        userName: string; adressMail: string; password: string; 
    }>(user: T){
        return new Promise<User>(async (resolve, reject) => {
            try {
                const admin = await sequelizeConnect.transaction(async t=>{
                    const newUser = await User.create({
                        userName:user.userName,
                        addressMail:user.adressMail,
                        password:user.password
                    });
                    await newUser.createImage(undefined,{transaction:t});
                    await newUser.createRole({
                        roleName:'admin',
                        roleDescript:`Ce rôle est celui d'un administrateur`
                    })
                    const expiresAt = new Date(Date.now());
                    expiresAt.setHours(expiresAt.getHours()+1);
                    const codeverif = generateCode.generateId(6);
                    await newUser.createCodeVerif({
                        codeverif,
                        expiresAt
                    },{transaction:t,hooks:false});
                    return newUser;
                })
                resolve(admin);
            } catch (error) {
                reject(error);
            }
        })
    }
}

const userService = new UserService();
export default userService; 
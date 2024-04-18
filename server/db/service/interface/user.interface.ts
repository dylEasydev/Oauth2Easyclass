import { UserBaseInterface } from '../../interface';

/**
 * interface des services des services de Base d'un utilisateur
 */
export interface UserBaseServiceInterface{
    findUserById(id:number):Promise<UserBaseInterface | null>;
    findUserByName(userName?:string , mail?:string):Promise<UserBaseInterface | null>;
    createUser<T extends {
        userName:string,
        adressMail:string,
        password:string,
        subjetName?:string
    }>(user:T):Promise<UserBaseInterface>;
}
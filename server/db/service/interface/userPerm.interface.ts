import { UserBaseServiceInterface } from './user.interface';
import { UserBaseInterface } from '../../interface';

/**
 * interface des services d'un utilisateur permanent
 */
export interface UserPermServiceInterface extends UserBaseServiceInterface{
    getUserFromPassAndName(userName:string , password:string):Promise<UserBaseInterface>;
} 
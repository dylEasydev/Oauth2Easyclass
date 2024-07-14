import { UserBaseServiceInterface } from './user.interface';
import { UserBaseInterface } from '../../interface';

export interface UserPermServiceInterface extends UserBaseServiceInterface{
    getUserFromPassAndName(userName:string , password:string):Promise<UserBaseInterface>;
} 
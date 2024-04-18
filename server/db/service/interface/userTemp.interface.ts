import { UserBaseInterface, UserTempInterface } from '../../interface';
import { UserBaseServiceInterface } from './user.interface';

export interface UserTempServiceInterface extends UserBaseServiceInterface{
    saveUser(user:UserTempInterface):Promise<UserBaseInterface>;
}
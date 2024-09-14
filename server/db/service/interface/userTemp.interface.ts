import { UserBaseInterface, UserTempInterface } from '../../interface';
import { UserBaseServiceInterface } from './user.interface';

export interface UserTempServiceInterface extends UserBaseServiceInterface{
    /*
    sauvegarde un utilisateur temporaires parmis les utilisateur ou
    en attente.
    */
    saveUser(user:UserTempInterface):Promise<UserBaseInterface>;
}
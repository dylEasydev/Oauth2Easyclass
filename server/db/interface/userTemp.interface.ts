import { UserBaseInterface} from '../interface';

export interface UserTempInterface extends UserBaseInterface{

   /*
    * Methodes de sauvergarde d'un utilisateur temporaire.
        soit comme user soit comme enseignant en attente.
    */
    savePerm():Promise<UserBaseInterface>;
}
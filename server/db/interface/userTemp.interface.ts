import { UserBaseInterface} from '../interface';

/*
    interface des utilisateurs temporaires : les utilisateurs ayant créer un compte 
    mais sans avoir fait la verification mail
*/
export interface UserTempInterface extends UserBaseInterface{

    /*
        Methodes de sauvergarde d'un utilisateur temporaire.
        soit comme user soit comme enseignant en attente.
    */
    savePerm():Promise<UserBaseInterface>;
}
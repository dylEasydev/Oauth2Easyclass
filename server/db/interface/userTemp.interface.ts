import { UserBaseInterface  } from '../interface';

/**
 * Interface pour les utilisateurs en cours d'enregistrement.
 */
export interface UserTempInterface extends UserBaseInterface{

  /*
    Méthodes de sauvergarde d'un utilisateur temporaire.
    soit comme user soit comme enseignant en attente.
  */
    savePerm():Promise<UserBaseInterface>;
}
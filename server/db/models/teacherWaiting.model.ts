import { TeacherTemp } from './teacherTemp.model';

/** 
 * Models d'enseignants en attentes de validation .
*/
export class TeacherWaiting extends TeacherTemp{
    /**
     * Aucun code dans cette methodes vue que la sauvergarde
     * ce fait par les administrateur après étude de dossier...
     * implementation dans un autre service.
     */
    savePerm(){return {} as any}
}
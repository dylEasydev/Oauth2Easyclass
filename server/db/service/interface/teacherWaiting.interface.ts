import { UserTempInterface } from '../../interface';

export interface TeacherWaitingService {
    findTeacherByNameAndMail(username:string , email:string):Promise<UserTempInterface|null>;
}
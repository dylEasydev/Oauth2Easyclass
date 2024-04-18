import clientservice from './client.service';
import userService ,{NotFountError , PassWordError} from './user.service';
import tokenService  from './token.service';
import authorizationCodeService from './authorizationCode.service';
import studentService from './student.service';
import teacherService from './teacher.service';
import codeVerifService from './codeVerif.service';
import userTempService from './userTemp.service';
import teacherWaitService from './teacherWait.service';

export {
    clientservice ,userService,tokenService,authorizationCodeService,userTempService,
    NotFountError,PassWordError,studentService,teacherService,codeVerifService,teacherWaitService
}
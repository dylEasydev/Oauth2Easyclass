import { OauthController, SignController } from '../controller';
import { BaseRouter } from './base.router';

export class SignRouter extends BaseRouter<SignController>{
    public initRoute(): void {
        this.routerServeur.post('/sign/teacher',this.controllerService.signTeacher);
        this.routerServeur.post('/sign/student',this.controllerService.signStudent);
        this.routerServeur.post(
            '/sign/admin',
            new OauthController().serverOauth.authenticate,
            this.controllerService.signAdmin
        );    
    }
}

export default new SignRouter(new SignController()).routerServeur;
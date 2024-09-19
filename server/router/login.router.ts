import { OauthController } from '../controller';
import { BaseRouter } from './base.router';

class OauthRouter extends BaseRouter<OauthController>{
    public initRoute(): void {
        this.routerServeur.post('/login',this.controllerService.serverOauth.token());
        this.routerServeur.post('/code',this.controllerService.serverOauth.authorize())
    }
}

export default new OauthRouter(new OauthController()).routerServeur;
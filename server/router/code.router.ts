import { CodeVerifController } from '../controller';
import { BaseRouter } from './base.router';

class CodeRouter extends BaseRouter<CodeVerifController>{
    public initRoute(): void {
        this.routerServeur.post('/verifCode/:id',this.controllerService.verifieCode);
        this.routerServeur.put('/restartCode/:userName/:nametable',this.controllerService.restartCodeVerif);
    }
}

export default new CodeRouter(new CodeVerifController()).routerServeur;
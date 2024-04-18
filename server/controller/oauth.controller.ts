import ExpressOAuthServer from '@node-oauth/express-oauth-server';
import { modelOauth } from '../oauth';
import { BaseController } from './base.controller';
import {InvalidArgumentError,Request,Response} from '@node-oauth/oauth2-server'
import { UserPermInterface } from '../db/interface';
import { NotFountError } from '../db/service';


class OauthController extends BaseController{
    public serverOauth = new ExpressOAuthServer({
        model:modelOauth,
        accessTokenLifetime:7*24*60*60,
        refreshTokenLifetime:30*24*60*60,
        addAcceptedScopesHeader:true,
        addAuthorizedScopesHeader:true,
        allowBearerTokensInQueryString:true,
        authorizationCodeLifetime:2*60*60,
        allowEmptyState:false,
        authenticateHandler:{
            handle(req:Request, res:Response){
                return new Promise<UserPermInterface>(async(resolve, reject) => {
                    if (!(req instanceof Request)) {
                        throw new InvalidArgumentError('Invalid argument: `request` must be an instance of Request');
                      }
                  
                      if (!(res instanceof Response)) {
                        throw new InvalidArgumentError('Invalid argument: `response` must be an instance of Response');
                      }
                      try {
                            const username = req.body.username;
                            const password = req.body.password;
                            if(!username || !password){
                                throw new InvalidArgumentError('Invalid argument:`username` and `userPass`');
                            }
                            const user = await modelOauth.getUser(username,password);
                            if(user === null) reject(new NotFountError(`Invalid argument:'user'`))
                            else resolve(user);
                      } catch (error) {
                            console.error(error);
                            reject(error);
                      }
                })
            }
        }
    })
}

export {OauthController};


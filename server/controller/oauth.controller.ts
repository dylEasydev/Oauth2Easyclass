import ExpressOAuthServer from '@node-oauth/express-oauth-server';
import { modelOauth } from '../oauth';
import { BaseController } from './base.controller';
import {InvalidArgumentError,Request,Response} from '@node-oauth/oauth2-server';
import { UserPermInterface } from '../db/interface';
import { NotFountError } from '../db/service';


class OauthController extends BaseController{
    public serverOauth:ExpressOAuthServer;
    
    handleOauth(req:Request , res:Response){
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
                if(user === null) reject(new NotFountError('Invalid argument:`user`'));
                else resolve(user);
            } catch (error) {
                reject(error);
            }
        })
    }
    
    constructor(
        acceptedHandle = true , refreshTime=30 , accessTime=7 ,codeTime = 2,
        addAcceptedScopesHeader = true , addAuthorizedScopesHeader=true,
        allowBearerTokensInQueryString= true , allowEmptyState = true

    ){
        super();
        this.serverOauth = new ExpressOAuthServer({
            model:modelOauth,
            accessTokenLifetime:accessTime*24*60*60,
            refreshTokenLifetime:refreshTime*24*60*60,
            addAcceptedScopesHeader,
            addAuthorizedScopesHeader,
            allowBearerTokensInQueryString,
            authorizationCodeLifetime:codeTime*60*60,
            allowEmptyState,
            authenticateHandler:acceptedHandle?{
                handle:this.handleOauth
            }:undefined
        })
    }
}

export {OauthController};


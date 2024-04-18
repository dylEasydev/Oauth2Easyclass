import { 
    AccessToken,AuthorizationCodeInterface,ClientInterface,
    RefreshToken,TokenInterface,UserPermInterface 
} from '../db/interface';
import { 
    authorizationCodeService, clientservice, tokenService, userService
} from '../db/service';
import {helpToken} from '../helper';

class ModelOauth{

    generateAccessToken(
        client:ClientInterface, user:UserPermInterface,scope:string|string[],
    ){
        const dataToken = {
            userId:user.id,
            userName:user.userName,
            scope:scope,
            clientId:client.clientId
        }
        const token = helpToken.generate(dataToken,7*24*60*60);
        return Promise.resolve(token);
    }

    validateScope(
        user:UserPermInterface,
        client:ClientInterface ,scope:string[]|string
    ){  
        if(user.role !== undefined && user.role.scopes !== undefined){
            const scopeValid = user.role.scopes.map<string>(s=>{
                return s.scopeName;
            });
            if(!scope) return Promise.resolve(scopeValid);
            if(typeof scope === 'string'){
                return scope.split(',').every(s=>scopeValid.includes(s))? 
                Promise.resolve(scope.split(',')):Promise.resolve(false)
            } 
            else return scope.every(s=>scopeValid.includes(s))? 
            Promise.resolve(scope):Promise.resolve(false);
        }
        return Promise.resolve(false);
    }

    getClient( clientId: string,clientSecret: string|null){
        if(clientSecret === null){
            return clientservice.findByClientId(clientId).then(client=>{
                return client
            }).catch(error=>{
                console.error(error);
                return null;
            });
        }else{
            return clientservice.findByClienIdAndClienSecret(
                clientId,clientSecret
            ).then(client=>{
                return client;
            }).catch(error=>{
                console.error(error);
                return null
            })
        }
    }

    saveToken(
        token: TokenInterface, client: ClientInterface,
        user: UserPermInterface
    ){
        return tokenService.createToken(
            token , user.id,client.id
        ).then(token =>{
            token.client =client;
            token.user = user;
            return token;
        }).catch(error=>{
            console.error(error);
            return null;
        })   
    }

    getAccessToken(accessToken: string){
        return tokenService.getTokenByAccessToken(accessToken).then(token=>{
            return token;
        }).catch(error=>{
            console.error(error);
            return null;
        })
    }

    getRefreshToken(refreshToken: string){
        return tokenService.getTokenByRefreshToken(refreshToken).then(token=>{
            return token;
        }).catch(error=>{
            console.error(error);
            return null;
        })
    }

    verifyScope(token: AccessToken, scope: string | string[]){
        if(typeof(scope) === 'string') return Promise.resolve(scope.split(',').every(s=>token.scope.includes(s)));
        else return Promise.resolve(scope.every(s=>token.scope.includes(s)));
    }

    validateRedirectUri(redirect_uri: string, client: ClientInterface){
        return Promise.resolve(client.redirectUris.includes(redirect_uri));
    };

    revokeToken(token:RefreshToken){
        return tokenService.deleteTokenByRefreshToken(token.refreshToken).then(()=>{
            return true
        }).catch(error=>{
            console.error(error);
            return false;
        })
    }

    getAuthorizationCode(authorizationCode: string){
        return authorizationCodeService.getAuthorizationCode(
            authorizationCode
        ).then(authCode=>{
            return authCode;
        }).catch(error=>{
            console.error(error);
            return null;
        })
    }

    saveAuthorizationCode(
        code:AuthorizationCodeInterface,
        client:ClientInterface,
        user:UserPermInterface
    ){
        return authorizationCodeService.createAuthorizationCode(
            code,user.id,client.id
        ).then(code=>{
            code.client = client;
            code.user = user;
            return code;
        }).catch(error=>{
            console.error(error);
            return null;
        })
    }

    revokeAuthorizationCode(code:AuthorizationCodeInterface){
        return authorizationCodeService.deleteAuthCodeByCode(
            code.authorizationCode
        ).then(()=>{
            return true;
        }).catch(error=>{
            console.error(error);
            return false;
        })
    }

    getUser(username:string , password:string){
        return userService.getUserFromPassAndName(username , password).then(user =>{
            return user;
        }).catch(error=>{
            console.error(error);
            return null;
        })
    }

    getUserFromClient(client:ClientInterface){
        return  clientservice.getUser(client).then(user=>{
            return user;
        }).catch(error=>{
            console.log(error);
            return null;
        })
    }
}

export default new ModelOauth();
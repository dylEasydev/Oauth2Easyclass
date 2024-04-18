import {AccessToken, RefreshToken, TokenInterface} from '../../interface';

/**
 * interaface des services d'un token
 */
export interface TokenInterfaceService{
    createToken(
        token:TokenInterface , userId:number ,clientId:number
    ):Promise<TokenInterface>;
    getTokenByAccessToken(accessToken:string):Promise<AccessToken|null>;
    getTokenByRefreshToken(refreshToken:string):Promise<RefreshToken|null>;
    deleteTokenByRefreshToken(refreshToken:string):Promise<void>;
    deleteTokenByAccessToken(accessToken:string):Promise<void>;
} 
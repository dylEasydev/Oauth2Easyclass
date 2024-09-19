import { AuthorizationCodeInterface } from '../../interface';

export interface AuthorizationCodeServiceInterface{
    getAuthorizationCode(authorizationCode:string):Promise<AuthorizationCodeInterface|null>;
    deleteAuthCodeByCode(authorizationCode:string):Promise<void>;
    createAuthorizationCode(
        authorizationCode:AuthorizationCodeInterface,
        userId:number , clientId:number
    ):Promise<AuthorizationCodeInterface>;
}
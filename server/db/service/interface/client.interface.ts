import { ClientInterface, UserPermInterface } from '../../interface';

export interface ClientServiceInterface {

    findByClientId(clientId:string):Promise<ClientInterface|null>;
    findByClienIdAndClienSecret(clientId:string, clientSecret:string):Promise<ClientInterface|null>;
    getUser(client:ClientInterface):Promise<UserPermInterface>;
}
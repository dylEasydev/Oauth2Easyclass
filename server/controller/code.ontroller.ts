import { Response ,Request} from 'express';
import { BaseController } from './base.controller';
import { NotFountError, codeVerifService, userTempService } from '../db/service';
import { UserTempInterface } from '../db/interface';
import { CodeStatut, statusResponse } from '../helper';
import { ValidationError } from 'sequelize';
import { User } from '../db';

const nameTableValid = ['studentTemp','teacherTemp','user'];

export class CodeVerifController extends BaseController{

    async verifieCode(req:Request , res:Response){
        try {
            if(req.params.id){
                const id = parseInt(req.params.id);
                let {codeverif} = req.body;
                if(typeof codeverif !== 'number') codeverif = typeof codeverif === 'string'? parseInt(codeverif):0;

                const codeUser = await codeVerifService.findCodeVerif(codeverif,id);
                if(codeUser.expiresAt.getMilliseconds() > Date.now()){
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        `Le code de vérification à expirer !`
                    )
                }
                const user = await codeVerifService.getForeingData(codeUser);
                if(user instanceof User ){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Ce end-point est réservé aux utilisateurs temporaires !`
                    )
                }
                const userPerm = await userTempService.saveUser(user as UserTempInterface);

                return statusResponse.sendResponseJson(
                    CodeStatut.CREATE_STATUS,
                    res,
                    `Bienvenue ${userPerm.userName} chez easyclass.edu`,
                    userPerm
                );
            }
        } catch (error) {
            if(error instanceof NotFountError){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_PERMISSION_STATUS,
                    res,
                    error.message,
                    error
                );
            }
            if(error instanceof ValidationError){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    error.message,
                    error
                );
            }
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur , réessayez dans quelques instants !`,
                error
            );
        }
    }

    async restartCodeVerif(req:Request , res:Response){
        try {
            if(req.params.userName && req.params.nametable){
                if(!nameTableValid.includes(req.params.nametable)){
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        `Le nom de table non valide, il doit être inclus dans : ${nameTableValid}`
                    )
                }
                const user = await codeVerifService.getUserByNameTable(req.params.nametable,req.params.userName);
                await codeVerifService.updateCodeVerif(user);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `Code de verification mis à jour ${user.userName} veillez verifier votre boite mail ${user.addressMail} `
                )
            }
        } catch (error) {
            if(error instanceof NotFountError){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_PERMISSION_STATUS,
                    res,
                    error.message,
                    error
                );
            }
            if(error instanceof ValidationError){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    error.message,
                    error
                );
            }
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur , réessayez dans quelques instants !`,
                error
            );
        }
    }
}
import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { studentService, teacherService, teacherWaitService, userService } from '../db/service';
import { CodeStatut,statusResponse } from '../helper';
import { ValidationError } from 'sequelize';

export class SignController extends BaseController{

    async signTeacher(req:Request , res:Response){
        try {
            const {userName , addressMail ,password,subjetName} =req.body;
            const userFind = await userService.findUserByName(userName , addressMail);
            if(userFind !== null){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    `L'utilisateur ${userName} possède déjà un compte !`
                )
            }
            const teacherWaiting = await teacherWaitService.findTeacherByNameAndMail(userName,addressMail);
            if(teacherWaiting !== null){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    `L'utilisateur ${userName} possède déjà un compte !`
                )
            }
            const teacherTemp = await teacherService.createUser({
                userName,
                adressMail:addressMail,
                password,
                subjetName
            });
            return statusResponse.sendResponseJson(
                CodeStatut.CREATE_STATUS,
                res,
                `${userName} veillez consulter votre boite mail (${addressMail}) pour valider votre inscription !`,
                teacherTemp
            );
        } catch (error) {
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

    async signStudent(req:Request ,res:Response){
        try {
            const {userName , addressMail,password} = req.body;
            const userFind = await userService.findUserByName(userName , addressMail);
            if(userFind !== null){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    `L'utilisateur ${userName} possède déjà un compte !`
                )
            }
            const teacherWaiting = await teacherWaitService.findTeacherByNameAndMail(userName,addressMail);
            if(teacherWaiting !== null){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    `L'utilisateur ${userName} possède déjà un compte !`
                )
            }
            const student = await studentService.createUser({
                userName:userName,
                adressMail:addressMail,
                password:password
            });
            return statusResponse.sendResponseJson(
                CodeStatut.CREATE_STATUS,
                res,
                `${userName} veillez consulter votre boite mail ${addressMail} pour valider votre inscription`,
                student
            );
        } catch (error) {
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

    async signAdmin(req:Request ,res:Response){
        try {
            const {userName,addressMail,password} = req.body;
            const teacherWaiting = await teacherWaitService.findTeacherByNameAndMail(userName,addressMail);
            if(teacherWaiting !== null){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    `L'utilisateur ${userName} possède déjà un compte !`
                )
            }
            const admin = await userService.createUser({
                userName,
                adressMail:addressMail,
                password
            });
            return statusResponse.sendResponseJson(
                CodeStatut.CREATE_STATUS,
                res,
                `Bienvenue sur EasyClass votre Base de l'éducation administrateur ${userName}`,
                admin
            );
        } catch (error) {
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
import {
    User , CodeVerif , Client , Token,
    AuthPermission , AuthorizationCode,
    Image,Scope , Role, TeacherTemp,TeacherWaiting,
    StudentTemp,InfoClient
} from '../db';
import sequelizeConnect from './config';
import { scopeApp } from './hooks';
import { userService } from './service';

async function initData(){
    return new Promise<void>(async (resolve, reject) => {
        try {
            scopeApp.forEach(async s=>{
                await sequelizeConnect.transaction(async t=>{
                    await Scope.findOrCreate({
                        where:{scopeName:s.scopeName},
                        defaults:{
                            scopeDescript:s.scopeDescript,
                            scopeName:s.scopeName
                        }
                    })
                })
            })
            let adminFind= await User.findOne({where:{userName:process.env.ADMIN_NAME as string}});
            if(adminFind === null){
                adminFind= await userService.createUser({
                    userName:process.env.ADMIN_NAME as string,
                    adressMail:process.env.COMPANING_MAIl as string,
                    password:process.env. ADMIN_PASS as string
                });
            }
            await Client.findOrCreate({
                where:{clientId:"16639376"},
                defaults:{
                    clientId:"16639376",
                    clientSecret:"gheiqhekdlendhevjleh56783",
                    userId:adminFind.id,
                    grants:[
                        'authorization_code',
                        'client_credentials', 
                        'password',
                        'refresh_token'
                    ],
                    redirectUris:[`https://easyclass.edu/callback`]
                }
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

export function initDb(){
    return new Promise<void>(async(resolve, reject) => {
        const test = process.env.NODE_ENV === 'developemnent';
        try {
            await sequelizeConnect.authenticate();
            await User.sync({alter:test});
            await CodeVerif.sync({alter:test});
            await Client.sync({alter:test});
            await Token.sync({alter:test});
            await Role.sync({alter:test});
            await Scope.sync({alter:test});
            await AuthPermission.sync({alter:test});
            await AuthorizationCode.sync({alter:test});
            await Image.sync({alter:test});
            await TeacherTemp.sync({alter:test});
            await StudentTemp.sync({alter:test});
            await TeacherWaiting.sync({alter:test});
            await InfoClient.sync({alter:test});
            await initData();
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

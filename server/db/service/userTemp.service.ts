import { UserBaseInterface, UserTempInterface } from '../interface';

export class UserTempService{
    saveUser(user: UserTempInterface){
        return new Promise<UserBaseInterface>((resolve, reject) => {
            user.savePerm().then(userPerm=>{
                user.destroy({force:true}).catch(error=>reject(error));
                resolve(userPerm);
            }).catch(error=>{
                reject(error);
            })
        })
    }
}

export default new UserTempService() 
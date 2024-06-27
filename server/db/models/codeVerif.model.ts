import { 
    InferAttributes, InferCreationAttributes,Model ,
    CreationOptional,NonAttribute,FindOptions
} from 'sequelize';
import { 
    CodeVerifInterface , UserBaseInterface, UserPermInterface , 
    UserTempInterface
} from '../interface';
import { upperCaseFirst } from '../../helper';
import { TeacherTemp,StudentTemp, User } from '../../db';

export class CodeVerif extends Model<
    InferAttributes<CodeVerif>,
    InferCreationAttributes<CodeVerif>
>implements CodeVerifInterface{

    declare id: CreationOptional<number>;
    declare codeverif: number;
    declare expiresAt:Date;
    declare nameTable: CreationOptional<string>; 

    declare foreignId:CreationOptional<number>;
    
    [key: string]: (
        (options?: FindOptions<InferAttributes<UserBaseInterface>>) => Promise<UserBaseInterface>
    )|any;
    getForeignObject(
        options?:FindOptions<FindOptions<UserBaseInterface>>
    ):Promise<UserBaseInterface|null>{
        if(!this.nameTable) return Promise.resolve(null);
        const mixinName = `get${upperCaseFirst(this.nameTable)}`; 
        return this[mixinName](options);
    }

    getTeacherTemp(
        options?:FindOptions<InferAttributes<UserTempInterface>>
    ){
        return new Promise<UserTempInterface|null>(async(resolve, reject) => {
            try {
                if(this.nameTable !== 'teacherTemp') resolve(null);
                else{
                    const teacher = await TeacherTemp.findByPk(this.foreignId,options);
                    resolve(teacher);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    getStudentTemp(
        options?:FindOptions<InferAttributes<UserTempInterface>>
    ){
        return new Promise<UserTempInterface|null>(async(resolve, reject) => {
            try {
                if(this.nameTable !== 'studentTemp') resolve(null);
                else {
                    const student = await StudentTemp.findByPk(this.foreignId , options);
                    resolve(student)
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    getUser(
        options?:FindOptions<InferAttributes<UserPermInterface>>
    ){
        return new Promise<UserPermInterface|null>(async(resolve, reject) => {
            try {
                if(this.nameTable !== 'user')resolve(null);
                else{
                    const user = await User.findByPk(this.foreignId,options);
                    resolve(user)
                }
            } catch (error) {
                reject(error);
            }
        })
    }
    declare foreignData?: NonAttribute<UserBaseInterface> | undefined;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

}

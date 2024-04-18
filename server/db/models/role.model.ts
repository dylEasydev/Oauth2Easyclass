import {
     InferAttributes, InferCreationAttributes, Model,
     CreationOptional,Association,ForeignKey,NonAttribute, Transaction
} from 'sequelize';
import { 
    RoleInterface, ScopeInterface, UserPermInterface
} from '../interface';
import { AuthPermission, Scope } from '../../db';
import { Op } from 'sequelize';
import { TableScope } from '../../helper';

/*
    models des role de l'utilisateur comme 
    Administrateur , Etudiants et Enseignant 
*/
export class Role extends Model<
    InferAttributes<Role>,
    InferCreationAttributes<Role>
> implements RoleInterface{
    //attributs du models
    declare id: CreationOptional<number>;
    declare roleName: string;
    declare roleDescript: CreationOptional<string>;

    //timestamps
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    //cles secondaire 
    declare userId: ForeignKey<UserPermInterface['id']>;

    //objet de eagger logging
    declare user?: NonAttribute<UserPermInterface>| undefined;
    declare scopes?: NonAttribute<ScopeInterface[]>| undefined;

    //alias associations
    declare static associations: { 
        user: Association<RoleInterface, UserPermInterface>;
        scopes: Association<RoleInterface , ScopeInterface>; 
    };

    //methodes 
    addListScope(t?:Transaction|null){
        return new Promise<void>(async (resolve, reject) => {
            try {
                const scope = TableScope[this.roleName] as string[];
                
                const scopeData = await Scope.findAll({
                    where:{
                        scopeName:{
                            [Op.or]:scope
                        }
                    },
                    transaction:t
                });
                const joinData = scopeData.map(s=>{
                    return {roleId:this.id,scopeId:s.id};
                })
                await AuthPermission.bulkCreate(joinData,{transaction:t});
                resolve();
            } catch (error) {
                reject(error)
            }
        })
    }
}
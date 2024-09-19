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

/**
 * models du rôle d'un utilisateur
 */
export class Role extends Model<
    InferAttributes<Role>,
    InferCreationAttributes<Role>
> implements RoleInterface{

    declare id: CreationOptional<number>;
    declare roleName: string;
    declare roleDescript: CreationOptional<string>;

    //timestamps
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly deletedAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    //foreignKey
    declare userId: ForeignKey<UserPermInterface['id']>;

    //objets de eagger logging
    declare user?: NonAttribute<UserPermInterface>| undefined;
    declare scopes?: NonAttribute<ScopeInterface[]>| undefined;

    //alias d'associations
    declare static associations: { 
        user: Association<RoleInterface, UserPermInterface>;
        scopes: Association<RoleInterface , ScopeInterface>; 
    };

    /**
     * permet ajouter des permissions associer à ce role 
     */
    addListScope(t?:Transaction|null){
        return new Promise<void>(async (resolve, reject) => {
            try {
                /*
                    *y'auras toujours un tableau de permissions quelques
                    *soit le roleName c'est la raison du as string pour eviter des 
                    *conditions pas néccessaires
                */
                const scope = await TableScope[this.roleName]() as string[];
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
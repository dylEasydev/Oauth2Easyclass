import { Scope } from '../models';
import { DataTypes } from 'sequelize';
import sequelizeConnect from '../config';
import { readScope } from '../../helper';

const scopeValid = readScope.readScopeApp('scopeApp').map(data=>{
    return data.scopeName
})

Scope.init({
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    scopeName:{
        type: DataTypes.STRING(30),
        allowNull:false,
        validate:{
            isIn:{
                msg:`votre role doit faire partir de cette liste ${scopeValid}`,
                args:[scopeValid]
            }
        }
    },
    scopeDescript:{
        type:DataTypes.TEXT('tiny'),
        allowNull:true
    },
    createdAt: DataTypes.DATE ,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    timestamps:true,
    paranoid:true,
    tableName:'scope'
})

export {Scope}
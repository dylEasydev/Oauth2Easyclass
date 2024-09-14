import { Scope } from '../models';
import { DataTypes } from 'sequelize';
import sequelizeConnect from '../config';
import { readScope } from '../../helper';


const scopeValid = readScope.readScopeApp('scopeApp').then(scope=>{
    return scope.map(data=>{return data.scopeName;})
});

Scope.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    scopeName:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            async validateScope(value:string){
                try{
                    if( !(await scopeValid).includes(value))
                        throw(new Error(`Votre role doit faire partir de cette liste ${await scopeValid}`))
                }catch(error){
                    throw (error);
                }
            }
        }
    },
    scopeDescript:{
        type:DataTypes.TEXT,
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
import { Token } from '../models';
import sequelizeConnect from '../config';
import { DataTypes } from 'sequelize';

Token.init({
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    accessToken:{
        type:DataTypes.STRING,
        allowNull:false
    },
    refreshToken:{
        type:DataTypes.STRING,
        allowNull:false
    },
    accessTokenExpiresAt:{
        type:DataTypes.DATE,
        allowNull:false
    },
    refreshTokenExpiresAt:{
        type:DataTypes.DATE,
        allowNull:false
    },
    scope:{
        type:DataTypes.STRING,
        allowNull:false,
        get():string[]{
            const value:unknown = this.getDataValue('scope');
            const data = value as string;
            return data.split(',')
        },
        set(value:string[]){
            this.setDataValue('scope',value.join(',') as any)
        }
    },
    createdAt: DataTypes.DATE ,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    timestamps:true,
    paranoid:true,
    tableName:'token'
})

export {Token};
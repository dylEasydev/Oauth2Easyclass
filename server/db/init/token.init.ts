import { Token } from '../models';
import sequelizeConnect from '../config';
import { DataTypes } from 'sequelize';

Token.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    accessToken:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    refreshToken:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    accessTokenExpiresAt:{
        type:DataTypes.DATE,
        allowNull:false
    },
    refreshTokenExpiresAt:{
        type:DataTypes.DATE,
        allowNull:true
    },
    scope:{
        type:DataTypes.TEXT,
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

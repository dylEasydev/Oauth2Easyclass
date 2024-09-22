import { AuthorizationCode } from '../models';
import sequelizeConnect from '../config';
import { DataTypes } from 'sequelize';

AuthorizationCode.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    authorizationCode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    redirectUri:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isUrl:{msg:`entrer une url de redirection valide`}
        },
        defaultValue:`http://easyclass.edu/login/callback`
    },
    expiresAt:{
        type:DataTypes.DATE
    },
    scope:{
        type:DataTypes.TEXT,
        allowNull:false,
        get():string[]{
            const value:unknown = this.getDataValue('scope');
            const data = value as string;
            return data.split(',');
        },
        set(value:string[]){
            this.setDataValue('scope',value.join(',') as any)
        }
    },
    codeChallenge:DataTypes.STRING,
    codeChallengeMethod:DataTypes.STRING,
    createdAt: DataTypes.DATE ,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    timestamps:true,
    paranoid:true,
    tableName:'authorizationCode'
})

export {AuthorizationCode}

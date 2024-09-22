import { Client } from '../models';
import { DataTypes } from 'sequelize';
import sequelizeConnect from '../config';
import validator from 'validator';

Client.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    clientId:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            is:{
                args:/^[a-zA-Z0-9]+$/,
                msg:`Veillez fournir un identifiant sans carractères spéciaux !`
            },
            validIdClient(value:string){
                if(!value)throw new Error(`Veuillez fournir identifiant du client !`)
                if(value.length !== 8) throw new Error(`votre identifiant doit poccéder 8 carractères !`)
            }
        }
    },
    clientSecret:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true,
        validate:{
            validIdClient(value:string){
                if(!value)throw new Error(`Veuillez fournir la clés secrète du client !`)
                if(value.length !== 25) throw new Error(`votre clés secrète doit poccéder 25 carractères !`)
            }
        }
    },
    redirectUris:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            validAllUrl(value:string){
                const redirectUris = value.split(',');
                if(!(redirectUris.every(url=> validator.isURL(url)))){
                    throw new Error("toutes les url doivent être valide.")
                }
            }
        },
        defaultValue:`http://easyclass.edu/login/callback`,
        get():string[]{
            const value:unknown = this.getDataValue('redirectUris');
            const data = value as string;
            return data.split(',');
        },
        set(value:string[]){
            this.setDataValue('redirectUris',value.join(',') as any)
        }
    },
    grants:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            grantsValid(value:string){
                const grantValue = value.split(',')
                const grantsType = ['authorization_code' , 'client_credentials', 'password','refresh_token'];
                if(!grantValue.every(grant=> grantsType.includes(grant))){
                    throw new Error(`les grants types authoriser sont:${grantsType}`);
                }
            }
        },
        get():string[]{
            const value:unknown = this.getDataValue('grants');
            const data = value as string;
            return data.split(',')
        },
        set(value:string[]){
            this.setDataValue('grants',value.join(',') as any)
        }
    },
    createdAt: DataTypes.DATE ,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    timestamps:true,
    paranoid:true,
    tableName:'client'
})

export {Client};
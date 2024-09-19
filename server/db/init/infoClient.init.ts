import sequelizeConnect from '../config';
import { InfoClient } from '../models';
import { DataTypes} from 'sequelize';

const applicaionValid = [
    'application web', 'application mobile' , 'application de Bureau'
];

InfoClient.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    nameOrganization:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            is:{
                args:/^[a-zA-Z0-9]+$/,
                msg:`Veillez fournir un nom d'organisation sans carractères spéciaux !`
            },
            len:{
                msg:` le nom de l'organisation doit être entre 4 et30 carractères !`,
                args:[4,30]
            },
            notNull:{msg:`Veillez founir une autre valeur que <<null>> pour le nom de l'organisation !`},
            notEmpty:{msg:`Veillez passer une chaîne de carractères non vide pour le nom de l'organisation!`},
            isNameValid(value:string){
                if(!value) throw new Error(`Votre nom d'organisation ne doit pas être null !`);
                if(value.length < 4) throw new Error(`Fournissez au moins 4 carractères pour votre nom  de l'organisation !`);
            }
        }
    },
    typeApplication:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isIn:{
                args:[['application web', 'application mobile' , 'application de Bureau']],
                msg:`Les types applications Valide sont :${applicaionValid}`
            }
        }
    },
    addressOrganization:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{msg:`Veillez founir une adresse électronique Valide !`},
            notEmpty:{msg:`Veillez founir une adresse électronique Valide !`},
            isEmail:{msg:`Veillez founir une adresse électronique Valide !`} ,
        }
    },
    createdAt: DataTypes.DATE ,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    paranoid:true,
    tableName:'infoclient',
    timestamps:true
})

export {InfoClient};
import sequelizeConnect from '../config';
import { TeacherTemp } from '../models';
import { DataTypes } from 'sequelize';

TeacherTemp.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:{
            name:'uniqueNameKey',
            msg:`Ce nom d'utilisateur est déjà pris !`
        },
        validate:{
            is:{
                args:/^[a-zA-Z0-9]+$/,
                msg:`Veillez fournir un nom d'utilisateur sans carractères spéciaux !`
            },
            len:{
                msg:` le nom d'utilisateur doit être entre 4 et30 carractères !`,
                args:[4,30]
            },
            notNull:{msg:`Veillez founir une autre valeur que <<null>> pour le nom d'utilisateur !`},
            notEmpty:{msg:`Veillez passer une chaîne de carractères non vide pour le nom de l'utilisateur !`},
            isNameValid(value:string){
                if(!value) throw new Error(`Votre nom d'utilisateur ne doit pas être null !`);
                if(value.length < 4) throw new Error(`Fournissez au moins 4 carractères pour votre nom d'utilisateur !`);
                if(value.includes(' ')) throw new Error(`Pas espace blancs dans le nom d'utilisateur !`);
            }
        }
    },
    addressMail:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:{
            msg:`Cette adresse  électronique est déjà utiliser ! `,
            name:`mailKey`
        },
        validate:{
            notNull:{msg:`Veillez founir une adresse électronique Valide !`},
            notEmpty:{msg:`Veillez founir une adresse électronique Valide`},
            isEmail:{msg:`Veillez founir une adresse électronique Valide`} ,
        },
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{msg:`Veillez fournir un mots de passe !`},
            notEmpty:{msg:`Veillez fournir un mots de passe`},
            is:{
                args: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                msg: `Veillez fournir un mots de passe ayant au moins un chiffre , une ou plusieurs lettres majuscules , plus de 8 carractères et pas d'espace blancs !`
            },
            isPassValid(value:string){
                if(!value) throw new Error(`Veillez fournir un mots de passe !`);
                if(value.length < 8) throw new Error(`Veillez fournir un mots de passe ayant au moins un chiffre , une ou plusieurs lettres majuscules , plus de 8 carractères et pas d'espace blancs  !`);
                if(value.includes(' ')) throw new Error(`Veillez fournir un mots de passe ayant au moins un chiffre , une ou plusieurs lettres majuscules , plus de 8 carractères ! et pas d'espace blancs !`);
            }
        }
    },
    subjectName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            is:{
                args:/^[a-zA-Z0-9]+$/,
                msg:`Veillez fournir un nom de matières sans carractères spéciaux !`
            },
            notNull:{msg:`Veillez founir un nom de matière`},
            notEmpty:{msg:`Veillez founir un nom de matière`},
            isNameValid(value:string){
                if(!value) throw new Error(`Veillez founir un nom de matière`);
                if(value.length < 4) throw new Error(`Fournissez au moins 4 carractères pour votre nom de matière !`);
                if(value.includes(' ')) throw new Error(`Pas espace blancs dans le nom de la matière !`);
            }
        }
    },
    createdAt: DataTypes.DATE ,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    paranoid:true,
    timestamps:true,
    tableName:'teacherTemp'
})

export {TeacherTemp}
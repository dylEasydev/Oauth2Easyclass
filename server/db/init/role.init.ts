import { Role } from '../models';
import { DataTypes } from 'sequelize';
import sequelizeConnect from '../config';

const roleValid = ['teacher','student','admin']
Role.init({
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    roleName:{
        type: DataTypes.STRING(30),
        allowNull:false,
        validate:{
            isIn:{
                msg:`votre role doit faire partir de cette liste ${roleValid}`,
                args:[roleValid]
            }
        }
    },
    roleDescript:{
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
    tableName:'role'
})

export {Role};
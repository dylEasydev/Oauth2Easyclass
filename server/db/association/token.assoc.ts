import {
    User , Token, Client 
} from '../init';

/**
 * association One-to-Many entre Token et User 
 * un token est associé à un seul utilisateur
 */
Token.belongsTo(User,{
    foreignKey:{
        name:'userId',
        allowNull:false
    },
    targetKey:'id',
    hooks:true,
    onDelete:'CASCADE',
    as:'user'
});

/**
 * association entre One-To-Many entre Token et Client
 * un token est associé à un seul client 
 */
Token.belongsTo(Client,{
    foreignKey:{
        name:'clientId',
        allowNull:false
    },
    targetKey:'id',
    hooks:true,
    onDelete:'CASCADE',
    as:'client'
});

export {Token};
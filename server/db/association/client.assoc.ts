import {
    Client , User , AuthorizationCode, InfoClient, Token
} from '../init';

/**
 * association One-to-many entre Client et User
 * un client est associer à un seul utilisateur
 */
Client.belongsTo(User,{
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
 * association one-to-many entre client et authorizationCode
 * un client à plusieurs code authorization 
 */
Client.hasMany(AuthorizationCode , {
    foreignKey:{
        name:'clientId',
        allowNull:false
    },
    sourceKey:'id',
    hooks:true,
    onDelete:'CASCADE',
    as:'authCodes',
});

/**
 * association one-to-one entre client et infoclient
 */
Client.hasOne(InfoClient,{
    foreignKey:{
        name:'cliendId',
        allowNull:false
    },
    sourceKey:'id',
    onDelete:'CASCADE',
    hooks:true,
    as:'infoClient'
});

/**
 * association one-to-many entre client et Token 
 * un client peut avoir plusieur jeton d'accès
 */
Client.hasMany(Token,{
    foreignKey:{
        name:'clientId',
        allowNull:false
    },
    sourceKey:'id',
    hooks:true,
    onDelete:'CASCADE',
    as:'tokens'
});

export {Client};
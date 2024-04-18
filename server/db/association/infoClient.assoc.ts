import { Client, InfoClient } from '../init';

/**
 * association One-To-One entre Infoclient et Client
 * une info client est associer à un seul client
 */
InfoClient.belongsTo(Client,{
    foreignKey:{
        name:'cliendId',
        allowNull:false
    },
    targetKey:'id',
    onDelete:'CASCADE',
    hooks:true,
    as:'client'
});

export {InfoClient};
import { AuthorizationCode , User ,Client} from '../init';

/**
 * association one-to-many entre authorizationCode et user
 */
AuthorizationCode.belongsTo(User,{
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
 * association one-to-many entre authorizationCode et client
 */
AuthorizationCode.belongsTo(Client,{
    foreignKey:{
        name:'clientId',
        allowNull:false
    },
    targetKey:'id',
    hooks:true,
    onDelete:'CASCADE',
    as:'client'
});

export {AuthorizationCode};